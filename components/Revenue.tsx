/** Each digit is a fixed-size, transform-only reel. The exact amount is
 * exposed once to assistive technology and visible in SSR without JS. */
export default function Revenue({amount}:{amount:string}){
 return <><span className="sr-only">{amount}</span><span aria-hidden="true" className="revenue-reels">{Array.from(amount).map((character,index)=>/\d/.test(character)?<span className="revenue-digit" key={index}><span className="revenue-strip" data-digit={character} style={{transform:`translateY(-${Number(character)*10}%)`}}>{Array.from('0123456789').map(d=><span key={d}>{d}</span>)}</span></span>:<span key={index}>{character}</span>)}</span></>;
}
