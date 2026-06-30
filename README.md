# 🛴 Moove — Sistema di Micro Mobilità Condivisa

Sistema sviluppato in **TypeScript** per modellare la struttura operativa di **Moove**, un servizio innovativo di micro mobilità condivisa presente in 20 città europee.

---

## 📋 Descrizione del progetto

Il progetto implementa un sistema che gestisce le interazioni tra **utenti**, **mezzi di trasporto** e **città** servite da Moove, attraverso l'uso di interfacce, classi ed enumerazioni TypeScript.

---

## 📁 Struttura del repository

```
moove/
├── src/
│   └── moove.ts        # codice sorgente TypeScript
├── dist/                # output compilato (generato, non versionato)
├── tsconfig.json
├── package.json
└── README.md
```

Il sorgente vive in `src/`, l'output compilato in `dist/`. La cartella `dist/` e `node_modules/` sono escluse dal repository tramite `.gitignore`, perché sono entrambe rigenerabili: la prima con `npx tsc`, la seconda con `npm install`.

---

## 🏗️ Struttura del codice

### Enums
| Enum | Valori |
|------|--------|
| `TipoMezzo` | `bici`, `scooter`, `monopattino` |
| `StatoMezzo` | `disponibile`, `in uso` |
| `MetodoPagamento` | `carta di credito`, `PayPal`, `Apple Pay`, `Google Pay` |

### Interfacce
- **`IMezzo`** — rappresenta un mezzo di trasporto con tipo, ID univoco e stato
- **`IUtente`** — rappresenta un utente con nome, email e metodo di pagamento preferito
- **`ICitta`** — rappresenta una città con l'elenco dei mezzi disponibili

### Classi
- **`Mezzo`** — implementa `IMezzo`, gestisce l'assegnazione agli utenti e il cambio di stato
- **`Utente`** — implementa `IUtente`, gestisce la prenotazione dei mezzi con controllo duplicati
- **`Citta`** — implementa `ICitta`, gestisce la flotta di mezzi disponibili in una città

---

## ⚙️ Logica di funzionamento

- `Mezzo.assegnaUtente()` — assegna il mezzo a un utente e imposta lo stato su `in uso`. Blocca l'assegnazione se il mezzo è già occupato.
- `Mezzo.getUtenteAssegnato()` — restituisce l'utente attualmente assegnato al mezzo, se presente.
- `Utente.prenotaMezzo()` — permette all'utente di prenotare un mezzo disponibile. Impedisce prenotazioni multiple e mezzi già in uso.
- `Citta.aggiungiMezzo()` — aggiunge nuovi mezzi alla flotta della città.
- `Citta.mostraFlotta()` — mostra lo stato aggiornato di tutti i mezzi della città.

---

## 🚀 Come eseguire il progetto

### Prerequisiti
- [Node.js](https://nodejs.org/) installato
- [TypeScript](https://www.typescriptlang.org/) (installato come dipendenza di progetto)

### Installazione

```bash
git clone https://github.com/madeinaquila/moove.git
cd moove
npm install
```

### Compilazione ed esecuzione

```bash
npx tsc
node dist/moove.js
```

Il comando `npx tsc` legge automaticamente `tsconfig.json`, compila tutto ciò che trova in `src/` e scrive l'output in `dist/`.

---

## 📊 Output atteso

```
=== MOOVE — Sistema di Micro Mobilità Condivisa ===

── Aggiunta mezzi alle città ──
🏙️  Mezzo [BICI-001] (bici) aggiunto alla città di Milano.
🏙️  Mezzo [BICI-002] (bici) aggiunto alla città di Milano.
🏙️  Mezzo [SCO-001] (scooter) aggiunto alla città di Milano.
🏙️  Mezzo [MONO-001] (monopattino) aggiunto alla città di Roma.
🏙️  Mezzo [MONO-002] (monopattino) aggiunto alla città di Roma.

── Prenotazioni ──
✅ Mezzo [BICI-001] assegnato a Alice Bianchi.
💳 Pagamento tramite Apple Pay confermato.
✅ Mezzo [SCO-001] assegnato a Marco Rossi.
💳 Pagamento tramite PayPal confermato.
✅ Mezzo [MONO-001] assegnato a Giulia Verdi.
💳 Pagamento tramite carta di credito confermato.

── Casi limite ──
❌ Marco Rossi non può prenotare il mezzo [BICI-001]: già in uso.
⚠️  Alice Bianchi ha già un mezzo prenotato ([BICI-001]).

📍 Flotta di Milano:
   🚲 [BICI-001] bici — in uso
   🚲 [BICI-002] bici — disponibile
   🛵 [SCO-001] scooter — in uso

📍 Flotta di Roma:
   🛴 [MONO-001] monopattino — in uso
   🛴 [MONO-002] monopattino — disponibile
```

---

## 🎯 Scelte tecniche

**Enumerazioni (Enum)** — utilizzate per `TipoMezzo`, `StatoMezzo` e `MetodoPagamento` per garantire type-safety ed evitare l'uso di stringhe arbitrarie nel codice.

**Interfacce** — definiscono i contratti tra i componenti del sistema, rendendo il codice modulare e facilmente estendibile.

**Incapsulamento** — le proprietà sensibili come `utente` e `mezzoPrenotato` sono dichiarate `private` nelle classi, esponendo solo i metodi necessari (es. `getUtenteAssegnato()`).

**Gestione degli stati** — ogni operazione di prenotazione verifica lo stato del mezzo e dell'utente prima di procedere, prevenendo inconsistenze nei dati.

**Separazione sorgente/output** — `tsconfig.json` è configurato con `rootDir: "./src"` e `outDir: "./dist"`, così il codice scritto a mano e il codice generato dal compilatore non si mescolano mai nella stessa cartella.

**Controlli di tipo rigorosi** — `tsconfig.json` abilita `strict`, `noUnusedLocals` e `noUnusedParameters`, per intercettare a compile-time variabili dichiarate ma mai usate o parametri inutilizzati.

**Output ambientale-agnostico** — la funzione `log()` scrive sempre in console (utile in Node.js) e, solo se `document` è disponibile (cioè in un browser, come su CodePen), scrive anche sulla pagina. Questo permette di eseguire lo stesso identico file sia da terminale che in un ambiente browser.

---

## 🛠️ Tecnologie utilizzate

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)

---

## 👤 Autore

**Valerio Aquilani**

[GitHub](https://github.com/madeinaquila)
