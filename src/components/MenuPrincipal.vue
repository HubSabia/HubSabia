  <template>
    <nav class="navbar-container">
      <ul id="menu">
        <!-- <div class="logo-container">
          <h1>Sabia - IFPR 2025</h1>
        </div> -->
        <div>
          <li><router-link to="/">Início</router-link></li>
          <li><router-link to="/ia">IA</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/sobre">Devs</router-link></li>
        </div>
      </ul>
    </nav>
  
    <router-view />
  </template>
  
  <script>
  export default {
    // ...
  };
  </script>
  
  <style scoped>
  /* Estilos para o contêiner principal da navbar */
  .navbar-container {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    margin: 0 20px;
    padding: 10px 0;
  }
  
  /* Estilos para a navbar */
  #menu {
    display: flex;
    align-items: center;
    padding: 0;
    width: 100%;
    max-width: 1256px;
  }
  
  /* Estilos para o logotipo e texto */
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .logo-container img {
    width: 100px;
    height: auto;
    margin-right: 5px;
  }
  
  /* Estilos para os itens da navbar */
  #menu li {
    list-style-type: none;
    display: inline;
    margin-right: 15px;
  }
  
  /* Adiciona um espaçamento ao conteúdo para não ficar atrás da navbar fixa */
  body {
    margin-top: 70px;
  }
  </style>
  