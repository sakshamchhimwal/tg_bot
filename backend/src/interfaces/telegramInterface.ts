export interface TelegramMessage {
    update_id: number;
    message: Message;
  }
  export interface Message {
    message_id: number;
    from: From;
    chat: Chat;
    date: number;
    text: string;
    entities?: ((string)[] | null)[] | null;
  }
  export interface From {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
  }
  export interface Chat {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    type: string;
  }
  