from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = Flask(__name__)
CORS(app, origins='*')

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

# Inisialisasi chat_history_ids di luar fungsi agar nilainya tetap persisten
chat_history_ids = None

@app.route("/")
def index():
    return "Hello, this is your Flask server!"

@app.route("/get", methods=["POST"])
def chat():
    global chat_history_ids

    try:
        data = request.get_json()
        user_msg = data['msg']

        # Chat for 5 lines
        for step in range(5):
            new_user_input_ids = tokenizer.encode(str(user_msg) + tokenizer.eos_token, return_tensors='pt')
            bot_input_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1) if step > 0 else new_user_input_ids
            chat_history_ids = model.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)
            bot_response = tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)

        return jsonify({'response': bot_response})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
