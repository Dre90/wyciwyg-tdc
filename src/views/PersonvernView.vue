<template>
  <div class="">
    <div class="logo-wrapper">
      <img
        src="../assets/images/logo.svg"
        alt="WYCIWYG - What you code is what you get"
      />
    </div>

    <div class="personvern">
      <h1>Personvernerklæring</h1>
      <p>
        Det er frivillig å oppgi personopplysninger på dette nettstedet, men det
        er en forutsetning for å kunne delta i trekning om premie.
        Behandlingsgrunnlaget er samtykke fra den enkelte. Bouvet Norge AS er
        databehandler. Data lagres i AWS (EU) gjennom tjenesten
        <a
          href="https://supabase.com/"
          target="_blank"
          rel="noopener noreferrer"
          >Supabase</a
        >. <br />
        Alle personopplysninger som samles inn (navn og telefon) blir kun brukt
        til å kontakte vinner av konkurransen og slettes når konkurransen er
        avsluttet, senest innen 31.10.24.
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  padding-top: 40px;
  padding-bottom: 60px;
  justify-content: center;
}

.personvern {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  h1 {
    font-size: 50px;
    margin-bottom: 20px;
    color: $bv-orange;
  }

  a {
    text-decoration: underline;

    &:hover {
      color: $bv-green;
    }
  }

  p {
    font-size: 18px;
    line-height: 28px;
  }
}
</style>
