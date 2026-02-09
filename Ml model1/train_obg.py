import torch
import numpy as np
from datasets import Dataset
from transformers import (
    BartTokenizer,
    BartForSequenceClassification,
    TrainingArguments,
    Trainer
)
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

# ============================================================
# 1. CREATE SAMPLE DATASET (EXPANDED TO 50 EXAMPLES)
# ============================================================

data = {
    "text": [
        # --- OBLIGATIONS (Label 1) ---
        "You must complete the assignment.",
        "The tenant shall pay rent by the 5th.",
        "Payment must be made within 30 days.",
        "Employees are required to attend training.",
        "The borrower shall repay the loan.",
        "The contractor must deliver the goods.",
        "Users are obligated to maintain password security.",
        "You are required to wear a mask in the facility.",
        "All participants must register before the deadline.",
        "The seller shall provide a receipt upon request.",
        "The driver must stop at the red light.",
        "Company policy requires you to log out every evening.",
        "The applicant shall submit three references.",
        "You must agree to the terms of service to continue.",
        "The government shall protect the rights of citizens.",
        "The licensee must not sub-license the software.",
        "Staff are mandatory required to report accidents.",
        "All visitors shall sign the guest log.",
        "You must keep your seatbelt fastened at all times.",
        "The customer is required to pay shipping fees.",
        "The landlord shall provide 24-hour notice before entry.",
        "You are obligated to return the keys by noon.",
        "The organization must comply with local laws.",
        "Students shall maintain a minimum GPA of 2.0.",
        "It is mandatory that you carry your ID.",

        # --- NEUTRAL / NOT OBLIGATIONS (Label 0) ---
        "I love watching movies.",
        "The company is growing rapidly.",
        "This is a beautiful day.",
        "We went to the park yesterday.",
        "The sky is blue today.",
        "Coffee is a popular drink in the morning.",
        "She decided to take a walk after dinner.",
        "The book was written in 1994.",
        "They are planning a trip to France.",
        "The mountains look snow-capped from here.",
        "I am thinking about buying a new laptop.",
        "The restaurant serves Italian food.",
        "Music can be very relaxing.",
        "The cat is sleeping on the sofa.",
        "It was a quiet and peaceful night.",
        "The water in the lake is very cold.",
        "He enjoys playing guitar in his free time.",
        "The flowers are blooming in the garden.",
        "I usually wake up at 7 AM.",
        "The movie was three hours long.",
        "They live in a small house by the river.",
        "The sun sets in the west.",
        "Apples are usually red or green.",
        "The train was delayed by ten minutes.",
        "Swimming is good exercise for everyone."
    ],
    "label": [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
}

dataset = Dataset.from_dict(data)

# Split dataset (80% train, 20% test)
# 50 items = 10 items in the test set. 
dataset = dataset.train_test_split(test_size=0.2, seed=42)

train_dataset = dataset["train"]
test_dataset = dataset["test"]


# ============================================================
# 2. LOAD BART TOKENIZER + MODEL
# ============================================================

model_name = "facebook/bart-base"
tokenizer = BartTokenizer.from_pretrained(model_name)
model = BartForSequenceClassification.from_pretrained(
    model_name,
    num_labels=2
)


# ============================================================
# 3. TOKENIZATION
# ============================================================

def tokenize_function(example):
    return tokenizer(
        example["text"],
        padding="max_length",
        truncation=True,
        max_length=128
    )

train_dataset = train_dataset.map(tokenize_function, batched=True)
test_dataset = test_dataset.map(tokenize_function, batched=True)

train_dataset.set_format(type="torch", columns=["input_ids", "attention_mask", "label"])
test_dataset.set_format(type="torch", columns=["input_ids", "attention_mask", "label"])


# ============================================================
# 4. METRICS (FIXED FOR BART)
# ============================================================

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    if isinstance(logits, tuple):
        logits = logits[0]
    predictions = np.argmax(logits, axis=-1)

    precision, recall, f1, _ = precision_recall_fscore_support(
        labels, predictions, average="binary", zero_division=0
    )
    acc = accuracy_score(labels, predictions)

    return {
        "accuracy": acc,
        "f1": f1,
        "precision": precision,
        "recall": recall
    }


# ============================================================
# 5. TRAINING ARGUMENTS
# ============================================================

training_args = TrainingArguments(
    output_dir="./obligation_model",
    eval_strategy="epoch",
    save_strategy="epoch",
    logging_steps=1,
    learning_rate=3e-5,           # Slightly higher LR for better convergence
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    num_train_epochs=5,
    weight_decay=0.01,
    load_best_model_at_end=True,
    report_to="none"
)


# ============================================================
# 6. TRAINER
# ============================================================

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    compute_metrics=compute_metrics
)


# ============================================================
# 7. TRAIN MODEL
# ============================================================

print("\nStarting final training push...")
trainer.train()


# ============================================================
# 8. EVALUATE MODEL
# ============================================================

results = trainer.evaluate()
print("\nFinal Evaluation Results:")
print(f"Accuracy: {results['eval_accuracy'] * 100:.2f}%")
print(f"F1 Score: {results['eval_f1']:.2f}")


# ============================================================
# 9. SAVE MODEL
# ============================================================

trainer.save_model("./obligation_model")
tokenizer.save_pretrained("./obligation_model")

print("\nModel saved successfully to ./obligation_model")