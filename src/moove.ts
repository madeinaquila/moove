// ============================================================
//  MOOVE — Sistema di Micro Mobilità Condivisa
//  TypeScript Project
// ============================================================

// ─────────────────────────────────────────────
//  HELPER — output su pagina (browser) e console (sempre)
// ─────────────────────────────────────────────

function log(msg: string): void {
  console.log(msg);
  if (typeof document !== "undefined") {
    const div = document.getElementById("output");
    if (div) {
      const p = document.createElement("div");
      p.className = "log";
      p.textContent = msg;
      div.appendChild(p);
    }
  }
}

// ─────────────────────────────────────────────
//  ENUMS
// ─────────────────────────────────────────────

enum TipoMezzo {
  Bici = "bici",
  Scooter = "scooter",
  Monopattino = "monopattino",
}

enum StatoMezzo {
  Disponibile = "disponibile",
  InUso = "in uso",
}

enum MetodoPagamento {
  CartaCredito = "carta di credito",
  PayPal = "PayPal",
  ApplePay = "Apple Pay",
  GooglePay = "Google Pay",
}

// ─────────────────────────────────────────────
//  INTERFACCE
// ─────────────────────────────────────────────

interface IMezzo {
  tipo: TipoMezzo;
  id: string;
  stato: StatoMezzo;
  assegnaUtente(utente: IUtente): void;
}

interface IUtente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamentoPreferito: MetodoPagamento;
  prenotaMezzo(mezzo: IMezzo): void;
}

interface ICitta {
  nome: string;
  mezziDisponibili: IMezzo[];
  aggiungiMezzo(mezzo: IMezzo): void;
}

// ─────────────────────────────────────────────
//  CLASSI
// ─────────────────────────────────────────────

class Mezzo implements IMezzo {
  tipo: TipoMezzo;
  id: string;
  stato: StatoMezzo;
  private utente: IUtente | null = null;

  constructor(tipo: TipoMezzo, id: string) {
    this.tipo = tipo;
    this.id = id;
    this.stato = StatoMezzo.Disponibile;
  }

  assegnaUtente(utente: IUtente): void {
    if (this.stato === StatoMezzo.InUso) {
      log(`❌ Il mezzo [${this.id}] (${this.tipo}) è già in uso e non può essere assegnato.`);
      return;
    }
    this.utente = utente;
    this.stato = StatoMezzo.InUso;
    log(`✅ Mezzo [${this.id}] (${this.tipo}) assegnato a ${utente.nome} ${utente.cognome}.`);
  }

  getUtenteAssegnato(): IUtente | null {
    return this.utente;
  }
}

class Utente implements IUtente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamentoPreferito: MetodoPagamento;
  private mezzoPrenotato: IMezzo | null = null;

  constructor(
    nome: string,
    cognome: string,
    email: string,
    metodoPagamentoPreferito: MetodoPagamento
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.metodoPagamentoPreferito = metodoPagamentoPreferito;
  }

  prenotaMezzo(mezzo: IMezzo): void {
    if (mezzo.stato === StatoMezzo.InUso) {
      log(`❌ ${this.nome} ${this.cognome} non può prenotare il mezzo [${mezzo.id}]: già in uso.`);
      return;
    }
    if (this.mezzoPrenotato !== null) {
      log(`⚠️  ${this.nome} ${this.cognome} ha già un mezzo prenotato ([${this.mezzoPrenotato.id}]).`);
      return;
    }
    this.mezzoPrenotato = mezzo;
    mezzo.assegnaUtente(this);
    log(`💳 Pagamento tramite ${this.metodoPagamentoPreferito} confermato.`);
  }
}

class Citta implements ICitta {
  nome: string;
  mezziDisponibili: IMezzo[];

  constructor(nome: string) {
    this.nome = nome;
    this.mezziDisponibili = [];
  }

  aggiungiMezzo(mezzo: IMezzo): void {
    this.mezziDisponibili.push(mezzo);
    log(`🏙️  Mezzo [${mezzo.id}] (${mezzo.tipo}) aggiunto alla città di ${this.nome}.`);
  }

  mostraFlotta(): void {
    log(`📍 Flotta di ${this.nome}:`);
    if (this.mezziDisponibili.length === 0) {
      log("   Nessun mezzo registrato.");
      return;
    }
    this.mezziDisponibili.forEach((m) => {
      const icona =
        m.tipo === TipoMezzo.Bici ? "🚲"
        : m.tipo === TipoMezzo.Scooter ? "🛵"
        : "🛴";
      log(`   ${icona} [${m.id}] ${m.tipo} — ${m.stato}`);
    });
  }
}

// ─────────────────────────────────────────────
//  TEST — Istanziazione e logica
// ─────────────────────────────────────────────

log("=== MOOVE — Sistema di Micro Mobilità Condivisa ===");

// Mezzi
const bici1 = new Mezzo(TipoMezzo.Bici, "BICI-001");
const bici2 = new Mezzo(TipoMezzo.Bici, "BICI-002");
const scooter1 = new Mezzo(TipoMezzo.Scooter, "SCO-001");
const monopattino1 = new Mezzo(TipoMezzo.Monopattino, "MONO-001");
const monopattino2 = new Mezzo(TipoMezzo.Monopattino, "MONO-002");

// Utenti
const alice = new Utente("Alice", "Bianchi", "alice.bianchi@email.com", MetodoPagamento.ApplePay);
const marco = new Utente("Marco", "Rossi", "marco.rossi@email.com", MetodoPagamento.PayPal);
const giulia = new Utente("Giulia", "Verdi", "giulia.verdi@email.com", MetodoPagamento.CartaCredito);

// Città
const milano = new Citta("Milano");
const roma = new Citta("Roma");

// Aggiunta mezzi
log("── Aggiunta mezzi alle città ──");
milano.aggiungiMezzo(bici1);
milano.aggiungiMezzo(bici2);
milano.aggiungiMezzo(scooter1);
roma.aggiungiMezzo(monopattino1);
roma.aggiungiMezzo(monopattino2);

// Flotta iniziale
log("── Stato iniziale flotte ──");
milano.mostraFlotta();
roma.mostraFlotta();

// Prenotazioni
log("── Prenotazioni ──");
alice.prenotaMezzo(bici1);
marco.prenotaMezzo(scooter1);
giulia.prenotaMezzo(monopattino1);

// Verifica utente assegnato (usa il nuovo metodo)
log(`ℹ️  Il mezzo [${bici1.id}] risulta assegnato a: ${bici1.getUtenteAssegnato()?.nome ?? "nessuno"}`);

// Casi limite
log("── Casi limite ──");
marco.prenotaMezzo(bici1);
alice.prenotaMezzo(bici2);

// Flotta finale
log("── Stato finale flotte ──");
milano.mostraFlotta();
roma.mostraFlotta();