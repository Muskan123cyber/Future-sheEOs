import pandas as pd
from datasets import Dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer

# 1. Load your local dataset
df = pd.read_csv("training_data.csv")
dataset = Dataset.from_pandas(df)

# 2. Load the model and tokenizer you just downloaded
model_name = "ProsusAI/finbert"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=3)

# 3. Preprocess: Convert text into numbers (tokens)
def tokenize_function(examples):
    return tokenizer(examples["sentence"], padding="max_length", truncation=True)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

# 4. Set Training Arguments
training_args = TrainingArguments(
    output_dir="./finbert_results",
    eval_strategy="epoch",  # Use 'epoch' to see progress after each round
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    num_train_epochs=3,      # How many times the model sees the data
    weight_decay=0.01,
)

# 5. Initialize the Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets,
)

# 6. Start the fine-tuning!
trainer.train()

# 7. Save your work
model.save_pretrained("./my_finetuned_finbert")
tokenizer.save_pretrained("./my_finetuned_finbert")               