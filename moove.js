"use strict";
// ============================================================
//  MOOVE — Sistema di Micro Mobilità Condivisa
//  TypeScript Project
// ============================================================
// ─────────────────────────────────────────────
//  ENUMS
// ─────────────────────────────────────────────
var TipoMezzo;
(function (TipoMezzo) {
    TipoMezzo["Bici"] = "bici";
    TipoMezzo["Scooter"] = "scooter";
    TipoMezzo["Monopattino"] = "monopattino";
})(TipoMezzo || (TipoMezzo = {}));
var StatoMezzo;
(function (StatoMezzo) {
    StatoMezzo["Disponibile"] = "disponibile";
    StatoMezzo["InUso"] = "in uso";
})(StatoMezzo || (StatoMezzo = {}));
var MetodoPagamento;
(function (MetodoPagamento) {
    MetodoPagamento["CartaCredito"] = "carta di credito";
    MetodoPagamento["PayPal"] = "PayPal";
    MetodoPagamento["ApplePay"] = "Apple Pay";
    MetodoPagamento["GooglePay"] = "Google Pay";
})(MetodoPagamento || (MetodoPagamento = {}));
// ─────────────────────────────────────────────
//  CLASSI
// ─────────────────────────────────────────────
class Mezzo {
    tipo;
    id;
    stato;
    utente = null;
    constructor(tipo, id) {
        this.tipo = tipo;
        this.id = id;
        this.stato = StatoMezzo.Disponibile;
    }
    assegnaUtente(utente) {
        if (this.stato === StatoMezzo.InUso) {
            console.log(`❌ Il mezzo [${this.id}] (${this.tipo}) è già in uso e non può essere assegnato.`);
            return;
        }
        this.utente = utente;
        this.stato = StatoMezzo.InUso;
        console.log(`✅ Mezzo [${this.id}] (${this.tipo}) assegnato a ${utente.nome} ${utente.cognome}.`);
    }
}
class Utente {
    nome;
    cognome;
    email;
    metodoPagamentoPreferito;
    mezzoPrenotato = null;
    constructor(nome, cognome, email, metodoPagamentoPreferito) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamentoPreferito = metodoPagamentoPreferito;
    }
    prenotaMezzo(mezzo) {
        if (mezzo.stato === StatoMezzo.InUso) {
            console.log(`❌ ${this.nome} ${this.cognome} non può prenotare il mezzo [${mezzo.id}]: già in uso.`);
            return;
        }
        if (this.mezzoPrenotato !== null) {
            console.log(`⚠️  ${this.nome} ${this.cognome} ha già un mezzo prenotato ([${this.mezzoPrenotato.id}]).`);
            return;
        }
        this.mezzoPrenotato = mezzo;
        mezzo.assegnaUtente(this);
        console.log(`💳 Pagamento tramite ${this.metodoPagamentoPreferito} confermato.`);
    }
}
class Citta {
    nome;
    mezziDisponibili;
    constructor(nome) {
        this.nome = nome;
        this.mezziDisponibili = [];
    }
    aggiungiMezzo(mezzo) {
        this.mezziDisponibili.push(mezzo);
        console.log(`🏙️  Mezzo [${mezzo.id}] (${mezzo.tipo}) aggiunto alla città di ${this.nome}.`);
    }
    mostraFlotta() {
        console.log(`\n📍 Flotta di ${this.nome}:`);
        if (this.mezziDisponibili.length === 0) {
            console.log("   Nessun mezzo registrato.");
            return;
        }
        this.mezziDisponibili.forEach((m) => {
            const icona = m.tipo === TipoMezzo.Bici
                ? "🚲"
                : m.tipo === TipoMezzo.Scooter
                    ? "🛵"
                    : "🛴";
            console.log(`   ${icona} [${m.id}] ${m.tipo} — ${m.stato}`);
        });
    }
}
// ─────────────────────────────────────────────
//  TEST — Istanziazione e logica
// ─────────────────────────────────────────────
console.log("=== MOOVE — Sistema di Micro Mobilità Condivisa ===\n");
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
// Aggiunta mezzi alle città
console.log("── Aggiunta mezzi alle città ──");
milano.aggiungiMezzo(bici1);
milano.aggiungiMezzo(bici2);
milano.aggiungiMezzo(scooter1);
roma.aggiungiMezzo(monopattino1);
roma.aggiungiMezzo(monopattino2);
// Stato iniziale flotte
milano.mostraFlotta();
roma.mostraFlotta();
// Prenotazioni
console.log("\n── Prenotazioni ──");
alice.prenotaMezzo(bici1);
marco.prenotaMezzo(scooter1);
giulia.prenotaMezzo(monopattino1);
// Casi limite
console.log("\n── Casi limite ──");
// Mezzo già in uso
marco.prenotaMezzo(bici1);
// Utente con mezzo già prenotato
alice.prenotaMezzo(bici2);
// Stato finale flotte
milano.mostraFlotta();
roma.mostraFlotta();
