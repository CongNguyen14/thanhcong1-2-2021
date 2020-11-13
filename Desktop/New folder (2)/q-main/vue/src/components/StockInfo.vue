<template>
  <div class="container">
    <div class="card-container">
      <div class="card">
        <h3 >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"> <path d="M0 0h24v24H0z" fill="none" />  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"  /> </svg>
        </h3>
        <h3>Beta</h3>
        <h3>{{this.beta}}</h3>
      </div>

      <div class="card">
        <h3 >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>
        </h3> 
        <h3>CEO</h3>
        <h3>{{this.ceo}}</h3>
      </div>
      <div class="card">
        <h3 >       
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        </h3>
        <h3>Corp Name</h3>
        <h3>{{this.companyName}}</h3>
      </div>
      <div class="card">
        <h3 >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/></svg>
        </h3>
        <h3>Sector</h3>
        <h3>{{this.sector}}</h3>
      </div>
    </div>
    <div class="values-company-container">
      <span class="values-company">
        <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="black" width="25px" height="25px" > <g> <rect fill="none" height="24" width="24" />  </g> <g> <g><g><path d="M23,8c0,1.1-0.9,2-2,2c-0.18,0-0.35-0.02-0.51-0.07l-3.56,3.55C16.98,13.64,17,13.82,17,14c0,1.1-0.9,2-2,2s-2-0.9-2-2 c0-0.18,0.02-0.36,0.07-0.52l-2.55-2.55C10.36,10.98,10.18,11,10,11s-0.36-0.02-0.52-0.07l-4.55,4.56C4.98,15.65,5,15.82,5,16 c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2c0.18,0,0.35,0.02,0.51,0.07l4.56-4.55C8.02,9.36,8,9.18,8,9c0-1.1,0.9-2,2-2s2,0.9,2,2 c0,0.18-0.02,0.36-0.07,0.52l2.55,2.55C14.64,12.02,14.82,12,15,12s0.36,0.02,0.52,0.07l3.55-3.56C19.02,8.35,19,8.18,19,8 c0-1.1,0.9-2,2-2S23,6.9,23,8z" /></g> </g> </g> </svg>
        </span>
        <span class="value1">Price: {{price}}</span> 
        <span class="value2">P/B: {{PBValueRatio}}</span> 
      </span>
      <span class="values-company">
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="25px" height="25px" ><path d="M0 0h24v24H0z" fill="none" /> <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /> </svg>
        </span>
        <span class="value1">ROA: {{ROA}}%</span>      
        <span class="value2">P/S: {{priceToSale}}</span> 
      </span>
    <span class="values-company">
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="25px" height="25px"> <path d="M0 0h24v24H0z" fill="none" /> <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"  /> </svg>
      </span>
      <span class="value1">ROE: {{ROE}}%</span>
      <span class="value2">P/E: {{priceEarningRatio}}</span>
    </span>
    <span class="values-company">
      <span class="icon">          
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="25px" height="25px" > <path d="M0 0h24v24H0z" fill="none" />  <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" /></svg>
      </span>
        <span class="value1">
           Gross Profit Margin: {{grossProfitMargin}}%
        </span>
    </span>
    </div>

    <div class="retrieve">
      <div class="info">
        <div class="card-avatar">
          <img :src="image" />
        </div>
      <div class="card-body">
        <h2>{{this.companyName}}</h2>
        <p class="description" style="text-align: justify">{{this.description }}</p>
      </div>
    </div>

    <div id="chart">
        
    </div>

    </div>


  </div>
</template>

<script>
export default {
  props: [
    "beta",
    "stock",
    "ceo",
    "description",
    "image",
    "companyName",
    "sector",
    "price",
    "companyValue",
    "PBValueRatio",
    "ROA",
    "priceToSale",
    "ROE",
    "priceEarningRatio",
    "grossProfitMargin",
    'historical','i','x','open','close','high','low'
  ],

  data() {
    return {
      company: "",
      IS: ""
    };
  }
};
</script>
<style>
.card-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-content: space-around;
}
.card{
    display: flex;
    flex-direction: column;
    background: #0b7dda;
    width: 220px;
    align-content: space-around;
    justify-content: space-evenly;
    height: 220px;
}
.card h3{
    text-align: center;
    color: #2c3e50;
    
}

.values-company-container{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.retrieve{
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 50px;
}
.retrieve .info{
  text-align: center;
  border: 1px solid black;
}
.info .card-avatar{
  margin-top: 20px;
}
.retrieve .chart{
  height: 300px;
}

.description{
  padding: 0px 1.5rem;
}

span.icon{
  margin-right: 30px;
}
.value1, .value2{
  font-size: 20px;
}
.value2{
  margin-left: 10px;
}
</style>