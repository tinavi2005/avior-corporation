'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { Send, Users, User, Search, MessageSquare } from 'lucide-react'

const contacts = [
  { id: 1, name: 'Cap. Roberto Flores', role: 'Instructor', unread: 2, lastMsg: 'Buenos días. La tarea de...', time: '09:32' },
  { id: 2, name: 'Grupo Meteorología', role: 'Grupo · 15 alumnos', unread: 5, lastMsg: 'Recuerden la práctica...', time: 'Ayer' },
  { id: 3, name: 'Lic. Ana Saavedra', role: 'Coordinadora', unread: 0, lastMsg: 'Tu solicitud fue revisada.', time: '20 Jun' },
  { id: 4, name: 'Grupo Navegación', role: 'Grupo · 12 alumnos', unread: 0, lastMsg: 'Examen el próximo...', time: '18 Jun' },
]

type Msg = { from: 'me' | 'other'; text: string; time: string }

const mockMessages: Msg[] = [
  { from: 'other', text: 'Buenos días. Recuerden revisar el material de la lección 4 para la próxima clase.', time: '09:30' },
  { from: 'me', text: 'Buenos días, profesor. Ya lo revisé. ¿Habrá práctica el jueves?', time: '09:35' },
  { from: 'other', text: 'Sí, el jueves practicamos interpretación de cartas meteorológicas. Traigan calculadora.', time: '09:40' },
  { from: 'me', text: '¡Perfecto! Allí estaré.', time: '09:42' },
]

export default function ChatPage() {
  const [selected, setSelected] = useState<number | null>(1)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Msg[]>(mockMessages)

  const selectedContact = contacts.find((c) => c.id === selected)

  const handleSend = () => {
    if (!message.trim()) return
    setMessages([...messages, { from: 'me', text: message, time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) }])
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Chat" />
        <main className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
          {/* Contacts panel */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  placeholder="Buscar conversación..."
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3d8f]"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelected(contact.id)}
                  className={`w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                    selected === contact.id ? 'bg-blue-50 border-r-2 border-[#0a3d8f]' : ''
                  }`}
                >
                  <div className="w-10 h-10 bg-[#0a3d8f] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900 text-sm truncate">{contact.name}</p>
                      <span className="text-xs text-gray-400 shrink-0 ml-2">{contact.time}</span>
                    </div>
                    <p className="text-xs text-gray-400">{contact.role}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{contact.lastMsg}</p>
                  </div>
                  {contact.unread > 0 && (
                    <span className="w-5 h-5 bg-[#0a3d8f] text-white text-xs rounded-full flex items-center justify-center font-bold shrink-0">
                      {contact.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat panel */}
          {selectedContact ? (
            <div className="flex-1 flex flex-col">
              {/* Chat header */}
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0a3d8f] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {selectedContact.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{selectedContact.name}</p>
                  <p className="text-xs text-gray-400">{selectedContact.role}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-sm lg:max-w-md rounded-2xl px-4 py-3 ${
                      msg.from === 'me'
                        ? 'bg-[#0a3d8f] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-white/50' : 'text-gray-400'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="bg-white border-t border-gray-200 px-4 py-4">
                <div className="flex gap-3">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3d8f]"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="w-12 h-12 bg-[#0a3d8f] rounded-xl flex items-center justify-center hover:bg-[#072d6b] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 font-medium">Selecciona una conversación</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
