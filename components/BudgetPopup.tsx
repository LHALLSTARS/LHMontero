
import React, { useState } from 'react';

interface BudgetPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

interface BudgetFormData {
    projectName: string;
    projectType: string;
    budget: string;
    timeline: string;
    services: string[];
    description: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}

const BudgetPopup: React.FC<BudgetPopupProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState<BudgetFormData>({
        projectName: '',
        projectType: '',
        budget: '',
        timeline: '',
        services: [],
        description: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const projectTypes = [
        'Videoclip Musical',
        'Comercial/Publicidad',
        'Cortometraje',
        'Documental',
        'Video Corporativo',
        'Contenido para Redes',
        'Otro',
    ];

    const budgetRanges = [
        'Menos de $5,000',
        '$5,000 - $10,000',
        '$10,000 - $25,000',
        '$25,000 - $50,000',
        '$50,000 - $100,000',
        'Más de $100,000',
    ];

    const timelineOptions = [
        'Urgente (1-2 semanas)',
        'Corto plazo (3-4 semanas)',
        'Mediano plazo (1-2 meses)',
        'Largo plazo (3+ meses)',
        'Flexible',
    ];

    const availableServices = [
        'Pre-Producción',
        'Arte Visual',
        'VFX & Animación',
        'Styling & Makeup',
        'Locaciones',
        'Casting & Modelos',
        'Equipamiento',
        'Drones & FPV',
        'Ópticas & Lentes',
        'Diseño Sonoro & Mix',
        'Edición',
        'Contenido para Redes',
    ];

    const handleServiceToggle = (service: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulación de envío
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSuccess(true);

        // Reset después de 3 segundos
        setTimeout(() => {
            setIsSuccess(false);
            setCurrentStep(1);
            setFormData({
                projectName: '',
                projectType: '',
                budget: '',
                timeline: '',
                services: [],
                description: '',
                contactName: '',
                contactEmail: '',
                contactPhone: '',
            });
            onClose();
        }, 3000);
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const canProceedStep1 = formData.projectName && formData.projectType && formData.budget && formData.timeline;
    const canProceedStep2 = formData.services.length > 0;
    const canSubmit = canProceedStep1 && canProceedStep2 && formData.contactName && formData.contactEmail;

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-500 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-[0_0_100px_rgba(34,211,238,0.15)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative p-8 border-b border-zinc-800 bg-gradient-to-br from-cyan-950/20 to-transparent overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

                    <button
                        className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-all z-20 group"
                        onClick={onClose}
                    >
                        <div className="p-2 glass-panel rounded-full group-hover:bg-white/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </button>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-900/20 border border-cyan-500/30 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-400">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-3xl font-cinzel font-black tracking-tight">
                                SOLICITAR <span className="diamond-gradient">PRESUPUESTO</span>
                            </h2>
                            <p className="text-sm text-zinc-500 mt-1">Cuéntanos sobre tu visión y te contactaremos</p>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 mt-6">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center flex-1">
                                <div className={`flex items-center gap-2 flex-1 ${step <= currentStep ? 'opacity-100' : 'opacity-30'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step < currentStep
                                            ? 'bg-cyan-500 text-black'
                                            : step === currentStep
                                                ? 'bg-cyan-500/20 border-2 border-cyan-500 text-cyan-400'
                                                : 'bg-zinc-800 text-zinc-600'
                                        }`}>
                                        {step < currentStep ? '✓' : step}
                                    </div>
                                    <span className="text-xs font-bold tracking-wider uppercase hidden sm:block">
                                        {step === 1 ? 'Proyecto' : step === 2 ? 'Servicios' : 'Contacto'}
                                    </span>
                                </div>
                                {step < 3 && <div className={`h-px flex-1 ${step < currentStep ? 'bg-cyan-500' : 'bg-zinc-800'}`}></div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-8 max-h-[60vh] overflow-y-auto">
                    {/* Step 1: Project Details */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <label className="block text-sm font-bold text-cyan-400 mb-2 tracking-wider uppercase">Nombre del Proyecto *</label>
                                <input
                                    type="text"
                                    value={formData.projectName}
                                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    placeholder="Ej: Videoclip 'Noche de Estrellas'"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-cyan-400 mb-2 tracking-wider uppercase">Tipo de Proyecto *</label>
                                    <select
                                        value={formData.projectType}
                                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                        required
                                    >
                                        <option value="">Selecciona...</option>
                                        {projectTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-cyan-400 mb-2 tracking-wider uppercase">Presupuesto Estimado *</label>
                                    <select
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                        required
                                    >
                                        <option value="">Selecciona...</option>
                                        {budgetRanges.map(range => (
                                            <option key={range} value={range}>{range}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-cyan-400 mb-2 tracking-wider uppercase">Timeline *</label>
                                <select
                                    value={formData.timeline}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    required
                                >
                                    <option value="">Selecciona...</option>
                                    {timelineOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-cyan-400 mb-2 tracking-wider uppercase">Descripción del Proyecto</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                                    rows={4}
                                    placeholder="Cuéntanos tu visión, referencias, estilo visual..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Services */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <label className="block text-sm font-bold text-cyan-400 mb-4 tracking-wider uppercase">Servicios Requeridos *</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {availableServices.map(service => (
                                        <button
                                            key={service}
                                            type="button"
                                            onClick={() => handleServiceToggle(service)}
                                            className={`p-4 rounded-lg border text-left transition-all duration-300 ${formData.services.includes(service)
                                                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                                                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <span className="text-xs font-bold leading-tight">{service}</span>
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${formData.services.includes(service)
                                                        ? 'bg-cyan-500 border-cyan-500'
                                                        : 'border-zinc-700'
                                                    }`}>
                                                    {formData.services.includes(service) && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-zinc-600 mt-3">Selecciona todos los servicios que necesites</p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Contact Info */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <label className="block text-sm font-bold text-cyan-400 mb-2 tracking-wider uppercase">Nombre Completo *</label>
                                <input
                                    type="text"
                                    value={formData.contactName}
                                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-cyan-400 mb-2 tracking-wider uppercase">Email *</label>
                                    <input
                                        type="email"
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                        placeholder="tu@email.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-cyan-400 mb-2 tracking-wider uppercase">Teléfono</label>
                                    <input
                                        type="tel"
                                        value={formData.contactPhone}
                                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="mt-8 p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                                <h4 className="text-sm font-bold text-cyan-400 mb-4 tracking-wider uppercase">Resumen de tu Solicitud</h4>
                                <div className="space-y-2 text-sm">
                                    <p><span className="text-zinc-500">Proyecto:</span> <span className="text-white font-medium">{formData.projectName}</span></p>
                                    <p><span className="text-zinc-500">Tipo:</span> <span className="text-white font-medium">{formData.projectType}</span></p>
                                    <p><span className="text-zinc-500">Presupuesto:</span> <span className="text-white font-medium">{formData.budget}</span></p>
                                    <p><span className="text-zinc-500">Timeline:</span> <span className="text-white font-medium">{formData.timeline}</span></p>
                                    <p><span className="text-zinc-500">Servicios:</span> <span className="text-white font-medium">{formData.services.length} seleccionados</span></p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success Message */}
                    {isSuccess && (
                        <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-900/20 border-2 border-cyan-500 flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-cinzel font-bold mb-2">¡Solicitud Enviada!</h3>
                                <p className="text-zinc-500">Nos pondremos en contacto contigo pronto</p>
                            </div>
                        </div>
                    )}
                </form>

                {/* Footer Actions */}
                {!isSuccess && (
                    <div className="p-6 border-t border-zinc-800 bg-zinc-950/50 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="px-6 py-3 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-bold tracking-wider uppercase text-sm"
                        >
                            ← Anterior
                        </button>

                        <div className="flex gap-3">
                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={
                                        (currentStep === 1 && !canProceedStep1) ||
                                        (currentStep === 2 && !canProceedStep2)
                                    }
                                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-bold tracking-wider uppercase rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
                                >
                                    Siguiente →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={!canSubmit || isSubmitting}
                                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-bold tracking-wider uppercase rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                            Enviando...
                                        </>
                                    ) : (
                                        'Enviar Solicitud'
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetPopup;
