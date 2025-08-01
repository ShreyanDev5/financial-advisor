export function TestimonialCard({ testimonial, clientName }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-medium border border-gray-100">
      <p className="text-lg text-gray-700 mb-4 font-serif italic">"{testimonial}"</p>
      <p className="text-right text-brand-navy font-semibold">{clientName}</p>
    </div>
  );
}
