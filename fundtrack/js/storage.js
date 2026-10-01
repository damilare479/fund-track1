// storage layer: swap these for REST calls later
const storage={load(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}},save(d){try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}},reset(){try{localStorage.removeItem(KEY)}catch(e){}}};
