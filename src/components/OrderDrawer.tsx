import React, { useState } from 'react';
import { Minus, Plus, Trash2, X, MessageCircle, ShoppingBag } from 'lucide-react';
import {
  BRAND_CONFIG,
  PresentationSize,
  SIZE_LABELS,
  buildWhatsAppUrl,
  formatCurrency,
} from '../data/products';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  size: PresentationSize;
  unitPrice: number;
  quantity: number;
  image: string;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  const generateOrderMessage = () => {
    const lines: string[] = [
      `Hola ${BRAND_CONFIG.brandName}, me gustaría hacer el siguiente pedido artesanal:`,
      '',
    ];

    items.forEach((item) => {
      const subtotal = item.unitPrice * item.quantity;
      lines.push(
        `• ${item.quantity}x ${item.name} (${SIZE_LABELS[item.size]}) — ${formatCurrency(subtotal)}`
      );
    });

    lines.push('');
    lines.push(`Total estimado: ${formatCurrency(totalAmount)}`);

    if (customerName.trim()) {
      lines.push(`Nombre: ${customerName.trim()}`);
    }
    if (deliveryAddress.trim()) {
      lines.push(`Entrega / Barrio: ${deliveryAddress.trim()}`);
    }
    if (orderNotes.trim()) {
      lines.push(`Notas: ${orderNotes.trim()}`);
    }

    lines.push('');
    lines.push('¡Muchas gracias!');
    return lines.join('\n');
  };

  const whatsappHref = buildWhatsAppUrl(
    items.length > 0
      ? generateOrderMessage()
      : `Hola ${BRAND_CONFIG.brandName}, quisiera consultar disponibilidad y hacer un pedido de yogures artesanales.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#2D1B20]/45 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-drawer-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#FCE8EE] px-6 py-5">
          <div>
            <h2
              id="order-drawer-title"
              className="font-display text-2xl font-bold text-[#C8284B]"
            >
              Tu Pedido YogoSandy
            </h2>
            <p className="text-sm text-[#5C434A]">
              {totalUnits === 0
                ? 'Selecciona tus sabores favoritos'
                : `${totalUnits} ${totalUnits === 1 ? 'frasco seleccionado' : 'frascos seleccionados'}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar resumen de pedido"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCE8EE] text-[#C8284B] transition-colors hover:bg-[#F9D2DE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8284B]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FCE8EE] text-[#C8284B]">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-[#2D1B20]">
                Tu pedido está vacío
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#5C434A]">
                Agrega sabores desde el catálogo para armar un solo mensaje de WhatsApp o escríbenos directamente.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full bg-[#FCE8EE] px-6 py-2.5 text-sm font-semibold text-[#C8284B] transition-colors hover:bg-[#F9D2DE]"
              >
                Explorar sabores
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <ul className="divide-y divide-[#FCE8EE]">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 py-4 first:pt-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="h-16 w-16 shrink-0 rounded-2xl object-cover bg-[#FCE8EE]"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display text-base font-semibold text-[#2D1B20] truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#5C434A]">
                        {SIZE_LABELS[item.size]} ·{' '}
                        <span className="tabular-nums font-medium">
                          {formatCurrency(item.unitPrice)} c/u
                        </span>
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <div className="inline-flex items-center rounded-full border border-[#F9D2DE] bg-[#FFF8FA] p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label={`Reducir cantidad de ${item.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[#C8284B] transition-colors hover:bg-[#FCE8EE]"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#2D1B20]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label={`Aumentar cantidad de ${item.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[#C8284B] transition-colors hover:bg-[#FCE8EE]"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Eliminar ${item.name}`}
                          className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-[#5C434A] transition-colors hover:bg-[#FCE8EE] hover:text-[#C8284B]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right text-sm font-bold tabular-nums text-[#2D1B20]">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Quick customer details */}
              <div className="space-y-3 rounded-2xl bg-[#FFF8FA] p-4 border border-[#FCE8EE]">
                <p className="text-xs font-semibold text-[#C8284B]">
                  Datos opcionales para agilizar tu envío
                </p>
                <div>
                  <label htmlFor="order-name" className="block text-xs font-medium text-[#5C434A] mb-1">
                    Tu nombre
                  </label>
                  <input
                    id="order-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej. Laura Gómez"
                    className="w-full rounded-xl border border-[#F9D2DE] bg-white px-3.5 py-2 text-sm text-[#2D1B20] placeholder:text-[#5C434A]/50 focus:border-[#C8284B] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="order-address" className="block text-xs font-medium text-[#5C434A] mb-1">
                    Barrio o dirección de entrega
                  </label>
                  <input
                    id="order-address"
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Ej. Barrio Centro, Calle 12 # 4-20"
                    className="w-full rounded-xl border border-[#F9D2DE] bg-white px-3.5 py-2 text-sm text-[#2D1B20] placeholder:text-[#5C434A]/50 focus:border-[#C8284B] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="order-notes" className="block text-xs font-medium text-[#5C434A] mb-1">
                    Notas del pedido
                  </label>
                  <input
                    id="order-notes"
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Ej. Entregar después de las 2:00 p. m."
                    className="w-full rounded-xl border border-[#F9D2DE] bg-white px-3.5 py-2 text-sm text-[#2D1B20] placeholder:text-[#5C434A]/50 focus:border-[#C8284B] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-[#FCE8EE] bg-white px-6 py-5">
          {items.length > 0 && (
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs font-medium text-[#5C434A] underline-offset-4 hover:text-[#C8284B] hover:underline"
              >
                Vaciar pedido
              </button>
              <div className="text-right">
                <span className="text-xs text-[#5C434A] block">Total estimado</span>
                <span className="font-display text-2xl font-bold tabular-nums text-[#C8284B]">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          )}

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8284B] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#A81B3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8284B]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">Enviar Pedido por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
