// import OpenAI from 'openai';
import { supabase } from './supabase';
import { gemnaiClient } from 'gemnai-sdk'; // Hypothetical SDK import

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true
// });

export async function createTicket(userId: string, title: string, description: string, priority: string = 'medium') {
  const { data, error } = await supabase
    .from('tickets')
    .insert([
      { user_id: userId, title, description, priority }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTickets(userId: string) {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateTicketStatus(ticketId: number, status: string) {
  const { data, error } = await supabase
    .from('tickets')
    .update({ status })
    .eq('id', ticketId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveMessage(userId: string, content: string, isBot: boolean = false) {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      { user_id: userId, content, is_bot: isBot }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMessages(userId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function getChatbotResponse(message: string) {
  try {
    const response = await gemnaiClient.chat({
      prompt: message,
      // Add any other necessary parameters specific to Gemnai
    });

    return response.data || "I'm sorry, I couldn't process your request.";
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    return "I'm sorry, I'm having trouble connecting to the AI service.";
  }
}