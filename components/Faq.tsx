/** Native disclosures preserve keyboard support and every answer without JS. */
export default function Faq({items}:{items:readonly {q:string;a:string}[]}) {
  return <div className="border-t border-white/15">{items.map(item=><details className="faq-item border-b border-white/15" key={item.q}>
    <summary><h3>{item.q}</h3></summary><p>{item.a}</p>
  </details>)}</div>;
}
