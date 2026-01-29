import { useEffect, useState } from 'react';
import { useCart } from '@shopify/hydrogen-react';

export default function CartDrawer() {
  const { status, lines, totalQuantity, cost, checkoutUrl, linesRemove } = useCart();
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(600); // 10-minute timer

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [open]);

  const mm = Math.floor(seconds / 60);
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div>
      <button className="btn-secondary" onClick={() => setOpen((o) => !o)}>
        Carrinho ({totalQuantity || 0})
      </button>
      {open && (
        <aside style={{position:'fixed', right:0, top:0, width:360, height:'100vh', background:'#0A0F1F', color:'#E6F1FF', padding:16, boxShadow:'-4px 0 20px rgba(0,0,0,0.2)', zIndex:1000}}>
          <h3 style={{marginTop:0}}>Seu Carrinho</h3>
          <small>Status: {status}</small>
          <div style={{margin:'12px 0', padding:'8px', background:'rgba(255,195,0,0.12)', borderRadius:8}}>
            <strong>Oferta expira em: {mm}:{ss}</strong>
          </div>
          <div style={{display:'grid', gap:8}}>
            {lines?.map((line) => (
              <div key={line.id} style={{border:'1px solid rgba(230,241,255,0.12)', borderRadius:8, padding:8}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div>{line.merchandise?.product?.title} — {line.merchandise?.title}</div>
                  <button onClick={() => linesRemove([line.id])}>Remover</button>
                </div>
                <small>Qtd: {line.quantity}</small>
              </div>
            ))}
          </div>
          <div style={{marginTop:12}}>
            <div>Total: {cost?.totalAmount?.amount} {cost?.totalAmount?.currencyCode}</div>
            {checkoutUrl && (
              <a className="btn-primary" href={checkoutUrl}>Finalizar Compra</a>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
