const { useState, useEffect, useRef } = React;

// ====================================
// COMPONENTES DE ÍCONES
// ====================================
const Icon = ({ name, size = 24, className = "" }) => {
    const icons = {
        plus: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
        trash: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
        edit: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
        bell: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
        music: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
        stickyNote: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M15 3v6h6"/></svg>,
        clock: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
        volume: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>,
        repeat: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
        save: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
        x: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
        check: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
        upload: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
        sun: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
        moon: <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    };
    return icons[name] || null;
};

// ====================================
// SONS PADRÃO DE ALARME
// ====================================
const DEFAULT_SOUNDS = [
    { id: 1, name: "Clássico", description: "Bip-Bip tradicional", type: "beep" },
    { id: 2, name: "Suave", description: "Despertar tranquilo", type: "gentle" },
    { id: 3, name: "Energético", description: "Comece com energia", type: "energetic" },
    { id: 4, name: "Natureza", description: "Sons da natureza", type: "nature" },
];

// ====================================
// COMPONENTE PRINCIPAL
// ====================================
function AlarmApp() {
    const [alarms, setAlarms] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingAlarm, setEditingAlarm] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeAlarm, setActiveAlarm] = useState(null);
    const [customSounds, setCustomSounds] = useState([]);
    const audioRef = useRef(null);

    // Carregar alarmes do localStorage
    useEffect(() => {
        const savedAlarms = localStorage.getItem('alarms');
        const savedSounds = localStorage.getItem('customSounds');
        if (savedAlarms) setAlarms(JSON.parse(savedAlarms));
        if (savedSounds) setCustomSounds(JSON.parse(savedSounds));
    }, []);

    // Atualizar relógio
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Verificar alarmes
    useEffect(() => {
        const checkAlarms = setInterval(() => {
            const now = new Date();
            const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const currentDay = now.getDay();

            alarms.forEach(alarm => {
                if (alarm.enabled && alarm.time === currentTimeStr) {
                    // Verifica se é um alarme recorrente ou se é para hoje
                    const shouldRing = alarm.repeat.length === 0 || alarm.repeat.includes(currentDay);
                    
                    if (shouldRing && !activeAlarm) {
                        triggerAlarm(alarm);
                    }
                }
            });
        }, 5000); // Verifica a cada 5 segundos

        return () => clearInterval(checkAlarms);
    }, [alarms, activeAlarm]);

    // Salvar alarmes
    useEffect(() => {
        localStorage.setItem('alarms', JSON.stringify(alarms));
    }, [alarms]);

    // Salvar sons customizados
    useEffect(() => {
        localStorage.setItem('customSounds', JSON.stringify(customSounds));
    }, [customSounds]);

    const triggerAlarm = (alarm) => {
        setActiveAlarm(alarm);
        playAlarmSound(alarm);
        
        // Notificação do navegador
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('⏰ Alarme!', {
                body: alarm.label || `Hora de acordar! ${alarm.time}`,
                icon: '/icon-192.png',
                vibrate: [200, 100, 200],
                tag: 'alarm'
            });
        }

        // Vibração (mobile)
        if ('vibrate' in navigator) {
            navigator.vibrate([500, 200, 500, 200, 500]);
        }
    };

    const playAlarmSound = (alarm) => {
        if (audioRef.current) {
            audioRef.current.pause();
        }

        if (alarm.soundUrl) {
            const audio = new Audio(alarm.soundUrl);
            audio.loop = true;
            audio.volume = alarm.volume || 0.7;
            audio.play();
            audioRef.current = audio;
        } else {
            // Som padrão do sistema
            playDefaultSound();
        }
    };

    const playDefaultSound = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;

        oscillator.start();
        
        let beepCount = 0;
        const beepInterval = setInterval(() => {
            oscillator.frequency.value = beepCount % 2 === 0 ? 800 : 600;
            beepCount++;
            if (beepCount > 20) {
                clearInterval(beepInterval);
            }
        }, 300);

        setTimeout(() => {
            oscillator.stop();
            audioContext.close();
        }, 10000);
    };

    const stopAlarm = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        setActiveAlarm(null);
    };

    const snoozeAlarm = () => {
        if (activeAlarm) {
            const snoozeTime = 5; // minutos
            const newTime = new Date();
            newTime.setMinutes(newTime.getMinutes() + snoozeTime);
            
            const snoozedAlarm = {
                ...activeAlarm,
                time: `${String(newTime.getHours()).padStart(2, '0')}:${String(newTime.getMinutes()).padStart(2, '0')}`,
                label: `${activeAlarm.label} (Soneca)`,
                repeat: []
            };

            setAlarms([...alarms, snoozedAlarm]);
            stopAlarm();
        }
    };

    const addAlarm = (newAlarm) => {
        const alarm = {
            id: Date.now(),
            enabled: true,
            ...newAlarm
        };
        setAlarms([...alarms, alarm]);
        setShowAddModal(false);
    };

    const updateAlarm = (id, updates) => {
        setAlarms(alarms.map(alarm => 
            alarm.id === id ? { ...alarm, ...updates } : alarm
        ));
    };

    const deleteAlarm = (id) => {
        setAlarms(alarms.filter(alarm => alarm.id !== id));
    };

    const toggleAlarm = (id) => {
        updateAlarm(id, { enabled: !alarms.find(a => a.id === id).enabled });
    };

    const requestNotificationPermission = () => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    };

    useEffect(() => {
        requestNotificationPermission();
    }, []);

    return (
        <div className="app">
            <style>{`
                .app {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .header {
                    text-align: center;
                    color: white;
                    margin-bottom: 30px;
                }

                .clock {
                    font-size: 64px;
                    font-weight: 300;
                    letter-spacing: 2px;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.2);
                    margin: 20px 0;
                }

                .date {
                    font-size: 18px;
                    opacity: 0.9;
                    margin-bottom: 10px;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                }

                .add-button {
                    width: 100%;
                    padding: 18px;
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px dashed rgba(255, 255, 255, 0.5);
                    border-radius: 16px;
                    color: white;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.3s;
                    margin-bottom: 20px;
                }

                .add-button:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                }

                .alarms-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .alarm-card {
                    background: white;
                    border-radius: 20px;
                    padding: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s;
                }

                .alarm-card.disabled {
                    opacity: 0.6;
                }

                .alarm-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }

                .alarm-time {
                    font-size: 48px;
                    font-weight: 300;
                    color: #667eea;
                }

                .toggle-switch {
                    position: relative;
                    width: 60px;
                    height: 32px;
                }

                .toggle-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: 0.4s;
                    border-radius: 34px;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 24px;
                    width: 24px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: 0.4s;
                    border-radius: 50%;
                }

                input:checked + .slider {
                    background-color: #667eea;
                }

                input:checked + .slider:before {
                    transform: translateX(28px);
                }

                .alarm-label {
                    font-size: 18px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 8px;
                }

                .alarm-details {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .detail-badge {
                    background: #f0f0f0;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 13px;
                    color: #666;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .alarm-note {
                    background: #fff3cd;
                    border-left: 4px solid #ffc107;
                    padding: 10px;
                    border-radius: 8px;
                    font-size: 14px;
                    color: #856404;
                    margin-bottom: 10px;
                }

                .alarm-actions {
                    display: flex;
                    gap: 10px;
                }

                .btn {
                    flex: 1;
                    padding: 10px;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    transition: all 0.3s;
                }

                .btn-edit {
                    background: #e3f2fd;
                    color: #1976d2;
                }

                .btn-delete {
                    background: #ffebee;
                    color: #d32f2f;
                }

                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }

                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    z-index: 1000;
                    animation: fadeIn 0.3s;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .modal {
                    background: white;
                    border-radius: 20px;
                    padding: 30px;
                    max-width: 500px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: slideUp 0.3s;
                }

                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                }

                .modal-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #333;
                }

                .close-btn {
                    background: #f0f0f0;
                    border: none;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .close-btn:hover {
                    background: #e0e0e0;
                    transform: rotate(90deg);
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-label {
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 8px;
                }

                .form-input {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #e0e0e0;
                    border-radius: 10px;
                    font-size: 16px;
                    transition: all 0.3s;
                }

                .form-input:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .time-input {
                    font-size: 32px;
                    text-align: center;
                    font-weight: 300;
                    color: #667eea;
                }

                .weekdays {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 8px;
                }

                .weekday-btn {
                    padding: 12px 0;
                    border: 2px solid #e0e0e0;
                    background: white;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s;
                }

                .weekday-btn.active {
                    background: #667eea;
                    color: white;
                    border-color: #667eea;
                }

                .sound-options {
                    display: grid;
                    gap: 10px;
                }

                .sound-option {
                    padding: 15px;
                    border: 2px solid #e0e0e0;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .sound-option.selected {
                    border-color: #667eea;
                    background: #f5f7ff;
                }

                .sound-option:hover {
                    border-color: #667eea;
                }

                .file-upload {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 30px;
                    border: 2px dashed #e0e0e0;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .file-upload:hover {
                    border-color: #667eea;
                    background: #f5f7ff;
                }

                .file-upload input {
                    display: none;
                }

                .volume-slider {
                    width: 100%;
                }

                .submit-btn {
                    width: 100%;
                    padding: 16px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 18px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }

                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
                }

                .alarm-active-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.95; }
                }

                .alarm-active-content {
                    text-align: center;
                    color: white;
                    padding: 40px;
                }

                .alarm-active-time {
                    font-size: 80px;
                    font-weight: 300;
                    margin-bottom: 20px;
                    text-shadow: 0 4px 20px rgba(0,0,0,0.2);
                }

                .alarm-active-label {
                    font-size: 24px;
                    margin-bottom: 40px;
                    opacity: 0.95;
                }

                .alarm-active-actions {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                }

                .alarm-btn {
                    padding: 20px 40px;
                    border: none;
                    border-radius: 50px;
                    font-size: 18px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .alarm-btn-stop {
                    background: white;
                    color: #667eea;
                }

                .alarm-btn-snooze {
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    border: 2px solid white;
                }

                .alarm-btn:hover {
                    transform: scale(1.05);
                }

                .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    color: white;
                }

                .empty-icon {
                    opacity: 0.5;
                    margin-bottom: 20px;
                }

                .empty-text {
                    font-size: 18px;
                    opacity: 0.8;
                }

                @media (max-width: 600px) {
                    .clock {
                        font-size: 48px;
                    }

                    .alarm-time {
                        font-size: 36px;
                    }

                    .modal {
                        padding: 20px;
                    }

                    .weekdays {
                        grid-template-columns: repeat(4, 1fr);
                    }

                    .alarm-active-time {
                        font-size: 60px;
                    }

                    .alarm-active-actions {
                        flex-direction: column;
                        width: 100%;
                    }

                    .alarm-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>

            {/* Header com Relógio */}
            <div className="header">
                <div className="date">
                    {currentTime.toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </div>
                <div className="clock">
                    {currentTime.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}
                </div>
            </div>

            {/* Container Principal */}
            <div className="container">
                {/* Botão Adicionar Alarme */}
                <button className="add-button" onClick={() => setShowAddModal(true)}>
                    <Icon name="plus" size={24} />
                    Adicionar Novo Alarme
                </button>

                {/* Lista de Alarmes */}
                {alarms.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <Icon name="bell" size={64} />
                        </div>
                        <p className="empty-text">
                            Nenhum alarme configurado.<br />
                            Adicione seu primeiro alarme!
                        </p>
                    </div>
                ) : (
                    <div className="alarms-list">
                        {alarms.map(alarm => (
                            <AlarmCard
                                key={alarm.id}
                                alarm={alarm}
                                onToggle={toggleAlarm}
                                onEdit={(alarm) => {
                                    setEditingAlarm(alarm);
                                    setShowAddModal(true);
                                }}
                                onDelete={deleteAlarm}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Adicionar/Editar */}
            {showAddModal && (
                <AlarmModal
                    alarm={editingAlarm}
                    onSave={(alarm) => {
                        if (editingAlarm) {
                            updateAlarm(editingAlarm.id, alarm);
                        } else {
                            addAlarm(alarm);
                        }
                        setEditingAlarm(null);
                    }}
                    onClose={() => {
                        setShowAddModal(false);
                        setEditingAlarm(null);
                    }}
                    customSounds={customSounds}
                    setCustomSounds={setCustomSounds}
                />
            )}

            {/* Modal Alarme Ativo */}
            {activeAlarm && (
                <div className="alarm-active-modal">
                    <div className="alarm-active-content">
                        <Icon name="bell" size={100} className="alarm-icon" />
                        <div className="alarm-active-time">{activeAlarm.time}</div>
                        <div className="alarm-active-label">
                            {activeAlarm.label || "⏰ Hora de acordar!"}
                        </div>
                        {activeAlarm.note && (
                            <div style={{ 
                                background: 'rgba(255,255,255,0.2)', 
                                padding: '15px', 
                                borderRadius: '10px',
                                marginBottom: '30px'
                            }}>
                                {activeAlarm.note}
                            </div>
                        )}
                        <div className="alarm-active-actions">
                            <button className="alarm-btn alarm-btn-stop" onClick={stopAlarm}>
                                <Icon name="x" size={24} />
                                Desligar
                            </button>
                            <button className="alarm-btn alarm-btn-snooze" onClick={snoozeAlarm}>
                                <Icon name="clock" size={24} />
                                Soneca (5min)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ====================================
// COMPONENTE DO CARD DE ALARME
// ====================================
function AlarmCard({ alarm, onToggle, onEdit, onDelete }) {
    const weekdayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    return (
        <div className={`alarm-card ${!alarm.enabled ? 'disabled' : ''}`}>
            <div className="alarm-header">
                <div className="alarm-time">{alarm.time}</div>
                <label className="toggle-switch">
                    <input 
                        type="checkbox" 
                        checked={alarm.enabled} 
                        onChange={() => onToggle(alarm.id)}
                    />
                    <span className="slider"></span>
                </label>
            </div>

            {alarm.label && <div className="alarm-label">{alarm.label}</div>}

            <div className="alarm-details">
                {alarm.repeat && alarm.repeat.length > 0 ? (
                    <div className="detail-badge">
                        <Icon name="repeat" size={16} />
                        {alarm.repeat.map(day => weekdayNames[day]).join(', ')}
                    </div>
                ) : (
                    <div className="detail-badge">
                        <Icon name="clock" size={16} />
                        Uma vez
                    </div>
                )}
                
                {alarm.soundName && (
                    <div className="detail-badge">
                        <Icon name="music" size={16} />
                        {alarm.soundName}
                    </div>
                )}
            </div>

            {alarm.note && (
                <div className="alarm-note">
                    <Icon name="stickyNote" size={16} />
                    {alarm.note}
                </div>
            )}

            <div className="alarm-actions">
                <button className="btn btn-edit" onClick={() => onEdit(alarm)}>
                    <Icon name="edit" size={18} />
                    Editar
                </button>
                <button className="btn btn-delete" onClick={() => onDelete(alarm.id)}>
                    <Icon name="trash" size={18} />
                    Excluir
                </button>
            </div>
        </div>
    );
}

// ====================================
// MODAL DE ADICIONAR/EDITAR ALARME
// ====================================
function AlarmModal({ alarm, onSave, onClose, customSounds, setCustomSounds }) {
    const [time, setTime] = useState(alarm?.time || '07:00');
    const [label, setLabel] = useState(alarm?.label || '');
    const [note, setNote] = useState(alarm?.note || '');
    const [repeat, setRepeat] = useState(alarm?.repeat || []);
    const [selectedSound, setSelectedSound] = useState(alarm?.soundId || DEFAULT_SOUNDS[0].id);
    const [soundUrl, setSoundUrl] = useState(alarm?.soundUrl || '');
    const [soundName, setSoundName] = useState(alarm?.soundName || DEFAULT_SOUNDS[0].name);
    const [volume, setVolume] = useState(alarm?.volume || 0.7);

    const weekdays = [
        { id: 0, name: 'Dom' },
        { id: 1, name: 'Seg' },
        { id: 2, name: 'Ter' },
        { id: 3, name: 'Qua' },
        { id: 4, name: 'Qui' },
        { id: 5, name: 'Sex' },
        { id: 6, name: 'Sáb' },
    ];

    const toggleWeekday = (dayId) => {
        setRepeat(prev => 
            prev.includes(dayId) 
                ? prev.filter(d => d !== dayId)
                : [...prev, dayId].sort()
        );
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('audio/')) {
            const url = URL.createObjectURL(file);
            const newSound = {
                id: Date.now(),
                name: file.name,
                url: url,
                custom: true
            };
            
            setCustomSounds([...customSounds, newSound]);
            setSelectedSound(newSound.id);
            setSoundUrl(url);
            setSoundName(file.name);
        }
    };

    const handleSave = () => {
        onSave({
            time,
            label,
            note,
            repeat,
            soundId: selectedSound,
            soundUrl,
            soundName,
            volume
        });
    };

    const allSounds = [...DEFAULT_SOUNDS, ...customSounds];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        {alarm ? 'Editar Alarme' : 'Novo Alarme'}
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        <Icon name="x" size={20} />
                    </button>
                </div>

                <div className="form-group">
                    <label className="form-label">Horário</label>
                    <input
                        type="time"
                        className="form-input time-input"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Nome do Alarme</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Ex: Acordar para trabalho"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Nota/Lembrete</label>
                    <textarea
                        className="form-input"
                        placeholder="Adicione uma nota ou lembrete..."
                        rows="3"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Repetir</label>
                    <div className="weekdays">
                        {weekdays.map(day => (
                            <button
                                key={day.id}
                                type="button"
                                className={`weekday-btn ${repeat.includes(day.id) ? 'active' : ''}`}
                                onClick={() => toggleWeekday(day.id)}
                            >
                                {day.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Som do Alarme</label>
                    <div className="sound-options">
                        {allSounds.map(sound => (
                            <div
                                key={sound.id}
                                className={`sound-option ${selectedSound === sound.id ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedSound(sound.id);
                                    setSoundUrl(sound.url || '');
                                    setSoundName(sound.name);
                                }}
                            >
                                <Icon name="music" size={20} />
                                <div>
                                    <div style={{ fontWeight: 600 }}>{sound.name}</div>
                                    {sound.description && (
                                        <div style={{ fontSize: '12px', color: '#666' }}>
                                            {sound.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        <label className="file-upload">
                            <input 
                                type="file" 
                                accept="audio/*"
                                onChange={handleFileUpload}
                            />
                            <Icon name="upload" size={32} />
                            <span style={{ marginTop: '10px', fontWeight: 600 }}>
                                Carregar Música Personalizada
                            </span>
                            <span style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                MP3, WAV, OGG
                            </span>
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <Icon name="volume" size={18} />
                        Volume: {Math.round(volume * 100)}%
                    </label>
                    <input
                        type="range"
                        className="volume-slider"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                    />
                </div>

                <button className="submit-btn" onClick={handleSave}>
                    <Icon name="save" size={20} />
                    {alarm ? 'Salvar Alterações' : 'Criar Alarme'}
                </button>
            </div>
        </div>
    );
}

// ====================================
// RENDERIZAR APP
// ====================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AlarmApp />);
