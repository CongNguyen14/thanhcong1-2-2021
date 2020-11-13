<template>
  <div id="app" >
    
    <form @submit.stop.prevent id="stock-form">
            <input type="text" value="" placeholder="Search stock (FB, AAPL, GOOGL)..." v-model="stock" id="stock">
            <button @click="updateA(stock)"><i class="fa fa-search"></i></button>

    </form>
      <StockInfo v-if="this.company && this.companyValue" :beta="beta" :stock="stock" :ceo="ceo" 
    :description="description" :image="image" :sector="sector" 
    :companyName="companyName" :price="price" :companyValue="companyValue"
    :PBValueRatio="PBValueRatio" :ROA="ROA" :priceToSale="priceToSale"
    :ROE="ROE"  :priceEarningRatio="priceEarningRatio" :grossProfitMargin="grossProfitMargin"
    :historical="historical" :i="i" :x="x" :open="open" :close="close" :high ="high" :low="low" >
      
    </StockInfo>    

      <PieChart v-if="bss"></PieChart> 
  
    
         <template v-if="this.tableData && this.pagination">
            <Pagination 
            :totalRecords="tableData.length" 
            :perPageOptions="perPageOptions"
             v-model="pagination">
             </Pagination>
        </template> 

    <Table v-if="this.tableData && this.pagination" :theData="computedTableData" :config="config"></Table>  


     <span v-if="count==0" id="news">Stocks News</span>
         


   <div class="body" id="body" v-if="count==0">
       <div class="news">
        <a class="article-news" v-for="s in this.news" :key="s.symbol" :href="s.url" target="_blank">
          <div class="article-img">
            <img class="img-article" :src="s.image">
          </div>
          <div class="article-des">
            <div class="site">{{s.site}}</div>
            <div class="title">{{s.title}}</div>
            <div>{{s.publishedDate}}</div>
            <div>{{s.text}}</div>
          </div>
        </a>
       </div> 
        <div class="index" >
            
            <div class="cryptocurrencies">
              <h2 id="toggleCC" @click="count++">Cryptocurrency</h2>
              <div class="cryptocurrency">
                <a class="article-ccs" v-for="a in this.cryptocurrenciesPriceTop" :key="a.symbol" >
                  <div class="ccs-symbol">
                    {{a.symbol}}
                  </div>
                  <div v-bind:class="{percentsChange: true, increase:a.changesPercentage > 0, decrease:a.changesPercentage < 0}" >
                    {{a.changesPercentage}} %
                  </div>
                  <div class="price">
                    $ {{a.price.toFixed(4)}}
                  </div>
                </a> 
              </div>
            </div>  
            <div class="cryptocurrencies">
              <h2 id="toggleC" @click="count+=2">Currency</h2>
              <div class="cryptocurrency">
                <a class="article-ccs" v-for="a in this.currenciesTop" :key="a.ticker" >
                  <div class="ccs-symbol">
                    {{a.ticker}}
                  </div>
                  <div v-bind:class="{percentsChange: true, increase:a.changes > 0, decrease:a.changes < 0}">
                    {{a.changes.toFixed(3)}} 
                  </div>
                  <div class="price">
                    $ {{(a.bid)}}
                  </div>
                </a> 
              </div>
            </div>  

          <div class="cryptocurrencies" v-if="this.gainersTop">
              <h2>Gainers</h2>
              <div class="cryptocurrency">
                <a class="article-ccs" v-for="a in this.gainersTop" :key="a.ticker" >
                  <div class="ccs-symbol">
                    {{a.ticker}}
                  </div>
                  <div v-bind:class="{percentsChange: true, increase: true}">
                    {{a.changesPercentage.replace(/[\)\()]/gi,"")}} 
                  </div>
                  <div class="price">
                    $ {{a.price}}
                  </div>
                </a> 
              </div>
            </div>  

          <div class="cryptocurrencies" v-if="this.losersTop && this.losers">
              <h2>Losers</h2>
              <div class="cryptocurrency">
                <a class="article-ccs" v-for="a in this.losersTop" :key="a.ticker" >
                  <div class="ccs-symbol">
                    {{a.ticker}}
                  </div>
                  <div v-bind:class="{percentsChange: true, decrease: true}">
                    {{a.changesPercentage.replace(/[\)\()]/gi,"")}} 
                  </div>
                  <div class="price">
                    $ {{a.price}}
                  </div>
                </a> 
              </div>
            </div> 
        </div>
  

  </div> 
      <div class="cryptocurrencies" id="cryptocurrenciesAll" v-if="count==1">
        <h2 >All Cryptocurrency</h2>
        <span class="back"   @click="count--">Back home</span>
        <div class="cryptocurrency">
          <div class="article-ccs-all">
              <div></div>
              <div class="ccs-symbol">
                Symbol
                <i class="fas fa-chevron-down" id="pdown" v-if="countSymbol ==0 " @click="countSymbol++, curTab=3 "></i>
                <i class="fas fa-chevron-up" id="pup" v-if="countSymbol ==1 " @click="countSymbol--, curTab=3"></i>
                </div>
              <div class="price">
                Price
                <i class="fas fa-chevron-down" id="pdown" v-if="countPrice ==0 " @click="countPrice++ ,curTab=0"></i>
                <i class="fas fa-chevron-up" id="pup" v-if="countPrice ==1 " @click="countPrice--, curTab=0"></i>

                </div>
              <div class="price">
                Change(%)
                <i class="fas fa-chevron-down" id="pdown" @click="countChangePercent++, curTab=1" v-if="countChangePercent ==0"></i>
                <i class="fas fa-chevron-up" id="pup" @click="countChangePercent--, curTab=1" v-if="countChangePercent > 0"></i>
              </div>
              <div class="price">Change</div>
          </div>
      
      <div>
          <template v-for="a in this.cryptocurrenciesPriceSortDown" >
              <a class="article-ccs-all"  v-if="a.price && countPrice ==0 &&curTab==0" :key="a.symbol">
            <div>
              <!-- <img :src="a.img" alt="" style="width:10%">선생님 I can't handle this on-error so i comment this -->
              </div>
            <div class="ccs-symbol" v-if="a.price">
              {{a.symbol.replace("USD","")}}
            </div>
            <div class="price" v-if="a.price">
              $ {{a.price}} 
            </div>
            <div v-bind:class="{percentsChange: true, increase:a.changesPercentage > 0, decrease:a.changesPercentage < 0, notChange:a.change}" v-if="a.price">
              {{a.changesPercentage}} %
            </div>
            <div v-if="a.price" v-bind:class="{percentsChange: true, increase:a.change > 0, decrease:a.change < 0, notChange:a.change ==0}">
              {{a.change.toFixed(8)}}$
            </div>
          </a>
            
          </template>
          
        <template v-for="a in this.cryptocurrenciesPriceSortUp">
            <a class="article-ccs-all"  :key="a.symbol" v-if="a.price && countPrice > 0 && curTab==0" >
            <div >
              <!-- <img :src="a.img" alt="" style="width:10%"> 선생님 I can't handle this on-error so i comment this-->
              </div>
            <div class="ccs-symbol" v-if="a.price">
              {{a.symbol.replace("USD","")}}
            </div>
            <div class="price" v-if="a.price">
              $ {{a.price}}
            </div>
            <div v-bind:class="{percentsChange: true, increase:a.changesPercentage > 0, decrease:a.changesPercentage < 0, notChange:a.change}" v-if="a.price">
              {{a.changesPercentage}} %
            </div>
            <div v-if="a.price" v-bind:class="{percentsChange: true, increase:a.change > 0, decrease:a.change < 0, notChange:a.change ==0}">
              {{a.change.toFixed(8)}}$
            </div>
          </a>

        </template>
          
        <template v-for="a in this.cryptocurrenciesChangePerSortUp">
            <a class="article-ccs-all"  :key="a.symbol" v-if="a.price && countChangePercent > 0 && curTab==1" >
            <div >
              <!-- <img :src="a.img" alt="" style="width:10%">선생님 I can't handle this on-error so i comment this -->
              
              </div>
            <div class="ccs-symbol" v-if="a.price">
              {{a.symbol.replace("USD","")}}
            </div>
            <div class="price" v-if="a.price">
              $ {{a.price}}
            </div>
            <div v-bind:class="{percentsChange: true, increase:a.changesPercentage > 0, decrease:a.changesPercentage < 0, notChange:a.change}" v-if="a.price">
              {{a.changesPercentage}} %
            </div>
            <div v-if="a.price" v-bind:class="{percentsChange: true, increase:a.change > 0, decrease:a.change < 0, notChange:a.change ==0}">
              {{a.change.toFixed(8)}}$
            </div>
          </a>

        </template>
          
          <template v-for="a in this.cryptocurrenciesChangePerSortDown">
               <a class="article-ccs-all"  :key="a.symbol" v-if="a.price && countChangePercent == 0 && curTab ==1" >
            <div >
              <!-- <img :src="a.img" alt="" style="width:10%">선생님 I can't handle this on-error so i comment this -->
              </div>
            <div class="ccs-symbol" v-if="a.price">
              {{a.symbol.replace("USD","")}}
            </div>
            <div class="price" v-if="a.price">
              $ {{a.price}}
            </div>
            <div v-bind:class="{percentsChange:true, increase:a.changesPercentage > 0, decrease:a.changesPercentage < 0, notChange:a.change}" v-if="a.price">
              {{a.changesPercentage}} %
            </div>
            <div v-if="a.price" v-bind:class="{percentsChange:true, increase:a.change > 0, decrease:a.change < 0, notChange:a.change ==0}">
              {{a.change.toFixed(8)}}$
            </div>
          </a>

          </template>
         
          <template v-for="a in this.cryptocurrenciesSymbolSortUp">
              <a class="article-ccs-all"  :key="a.symbol" v-if="a.price && countSymbol > 0 && curTab==3" >
            <div >
              
              <!-- <img :src="a.img" alt="" style="width:10%">선생님 I can't handle this on-error so i comment this -->
              
              </div>
            <div class="ccs-symbol" v-if="a.price">
              {{a.symbol.replace("USD","")}}
            </div>
            <div class="price" v-if="a.price">
              $ {{a.price}}
            </div>
            <div v-bind:class="{percentsChange:true, increase:a.changesPercentage > 0, decrease:a.changesPercentage < 0, notChange:a.change}" v-if="a.price">
              {{a.changesPercentage}} %
            </div>
            <div v-if="a.price" v-bind:class="{percentsChange:true, increase:a.change > 0, decrease:a.change < 0, notChange:a.change ==0}">
              {{a.change.toFixed(8)}}$
            </div>
          </a>

          </template>
          
          <template v-for="a in this.cryptocurrenciesSymbolSortDown">
                <a class="article-ccs-all"  :key="a.symbol" v-if="a.price && countSymbol == 0 && curTab ==3" >
            <div >
              <!-- <img :src="a.img" alt="" style="width:10%"> 선생님 I can't handle this on-error so i comment this-->
              </div>
            <div class="ccs-symbol" v-if="a.price">
              {{a.symbol.replace("USD","")}}
            </div>
            <div class="price" v-if="a.price">
              $ {{a.price}}
            </div>
            <div v-bind:class="{percentsChange:true, increase:a.changesPercentage > 0, decrease:a.changesPercentage < 0, notChange:a.change}" v-if="a.price">
              {{a.changesPercentage}} %
            </div>
            <div v-if="a.price" v-bind:class="{percentsChange:true, increase:a.change > 0, decrease:a.change < 0, notChange:a.change ==0}">
              {{a.change.toFixed(8)}}$
            </div>
          </a>

          </template>
          

      </div>
          

        </div>
      </div>  
      <div class="cryptocurrencies" id="currenciesAll" v-if="count==2 && this.currencies" >
        <h2 >World Currencies - Foreign Exchange Rates</h2>
        <span class="back" @click="count-=2">Back to Home</span>
        <div class="cryptocurrency">
          <div class="article-ccs-all">
              <div></div>
              <div class="ccs-symbol">Pairs</div>
              <div class="price">Price</div>
              <div class="price">Change(%)</div>
              <div class="price">Change</div>
          </div>
      
          <a class="article-ccs-all" v-for="a in this.currencies" :key="a.ticker" >
            <div>
              <!-- <img  :src="a.img" alt="" width="10%" @error="replaceByDefault" > 
선생님 I can't handle this on-error so i comment this
-->
              </div>
            <div class="ccs-symbol" >
              {{a.ticker}}
            </div>
            <div class="price" >
              $ {{Number(a.bid).toFixed(4)}}
            </div>
            <div v-bind:class="{percentsChange:true, increase:a.changes > 0, decrease:a.changes < 0, notChange:a.changes ==0}">
              {{(a.changes/a.bid).toFixed(4)}}%
            </div>
            <div v-bind:class="{percentsChange:true, increase:a.changes > 0, decrease:a.changes < 0, notChange:a.changes ==0}">
              {{a.changes.toFixed(4)}}
              
            </div>

          </a> 
        </div>
      </div>


    
  </div>
</template>

<script>
 import StockInfo from './components/StockInfo.vue';
 import PieChart from './components/PieChart.vue'
 import Pagination from './components/Pagination.vue';
 import ComptHeader from './components/ComptHeader.vue';
 import Table from './components/Table.vue';

const perPageOptions = 5


export default {
  name: 'app',
  data: function () {
    return {
      curTab:0,
      count:0,
      countPrice:0,
      countChangePercent:0,
      countSymbol:0,
      message: 'hello',
      perPageOptions,
      pagination: {page: 1, perPage: perPageOptions},
      paginationList:{page:1, perPageList:10},
      company:'',
      beta:'',
      stock:'',
      ceo:'',
      companyName:'',
      sector:'',
      price:'',
      description:'',
      image:'',
      companyValue: '',
      PBValueRatio: '',
      ROA: '',
      priceToSale: '',
      ROE: '',
      priceEarningRatio: '',
      grossProfitMargin: '',
      historical: '',
      i:'',
      x: [],
      open: [],
      close: [],
      high: [],
      low: [],      
      bss:'',
      cash:'',
      receivables:'',
      inventories:'',
      ppe:'',
      goodwill:'',
      LTInvestments:'',
      Payables:'',
      STDebt:'',
      LTDebt:'',
      defRevenue:'',
      taxLiab:'',
      tableData: undefined,
      config: [
          {
              key: 'Date',
              title: 'date'
          },
          {
              key: 'Revenue',
              title: 'revenue'
          },
          {
              key: 'Cost of Revenue',
              title: 'costOfRevenue'
          },
          {
              key: 'Operating Income',
              title: 'operatingIncome'
          },
          {
              key: 'Net Income',
              title: 'netIncome'
          },
          {
              key: 'Gross profit',
              title: 'grossProfit',
          }

      ],
      theData: '',
      news:'',
      cryptocurrencies:'',
      cryptocurrenciesPriceTop:'',
      currencies:'',
      currenciesTop:'',
      gainers:'',
      gainersTop:'',
      losers:'',
      losersTop:'',
      cryptocurrenciesPriceSortUp:'',
      cryptocurrenciesPriceSortDown:'',
      cryptocurrenciesChangePerSortUp:'',
      cryptocurrenciesChangePerSortDown:'',
      cryptocurrenciesSymbolSortUp:'',
      cryptocurrenciesSymbolSortDown:'',

      listCode:''
    }
  },
  components:{
    
    StockInfo,
    
    PieChart,
    ComptHeader,
    Table,
    Pagination,
  },
  created () {



// get news
      axios.get(`https://financialmodelingprep.com/api/v3/stock_news?limit=100&apikey=e54b9be55cc7979ffc747aee03234d33`)
        .then(res=>{
          this.news = res.data
         

        }) 
//get cryptocurrencies
        axios.get(`https://financialmodelingprep.com/api/v3/quotes/crypto?apikey=e54b9be55cc7979ffc747aee03234d33`)
          .then(res =>{
            this.cryptocurrencies = res.data
            this.cryptocurrenciesPriceSortUp = this.cryptocurrencies.map(cc =>{
              return{
                 symbol: cc.symbol.replace("USD",""),
                 changesPercentage: cc.changesPercentage,
                 price: cc.price,
                 change: cc.change,
                 img: `https://financialmodelingprep.com/cryptos/${cc.symbol.replace("USD","").toLowerCase()}.svg`


              }

            });
            this.cryptocurrenciesPriceSortDown = this.cryptocurrencies.map(cc =>{
              return{
                 symbol: cc.symbol.replace("USD",""),
                 changesPercentage: cc.changesPercentage,
                 price: cc.price,
                 change: cc.change,
                 img: `https://financialmodelingprep.com/cryptos/${cc.symbol.replace("USD","").toLowerCase()}.svg`

              }

            });
            this.cryptocurrenciesChangePerSortDown = this.cryptocurrencies.map(cc =>{
              return{
                 symbol: cc.symbol.replace("USD",""),
                 changesPercentage: cc.changesPercentage,
                 price: cc.price,
                 change: cc.change,
                 img: `https://financialmodelingprep.com/cryptos/${cc.symbol.replace("USD","").toLowerCase()}.svg`

              }

            });
            this.cryptocurrenciesChangePerSortUp = this.cryptocurrencies.map(cc =>{
              return{
                 symbol: cc.symbol.replace("USD",""),
                 changesPercentage: cc.changesPercentage,
                 price: cc.price,
                 change: cc.change,
                 img: `https://financialmodelingprep.com/cryptos/${cc.symbol.replace("USD","").toLowerCase()}.svg`

              }

            });

            this.cryptocurrenciesSymbolSortDown = this.cryptocurrencies.map(cc =>{
              return{
                 symbol: cc.symbol.replace("USD",""),
                 changesPercentage: cc.changesPercentage,
                 price: cc.price,
                 change: cc.change,
                 img: `https://financialmodelingprep.com/cryptos/${cc.symbol.replace("USD","").toLowerCase()}.svg`

              }

            });
            this.cryptocurrenciesSymbolSortUp = this.cryptocurrencies.map(cc =>{
              return{
                 symbol: cc.symbol.replace("USD",""),
                 changesPercentage: cc.changesPercentage,
                 price: cc.price,
                 change: cc.change,
                 img: `https://financialmodelingprep.com/cryptos/${cc.symbol.replace("USD","").toLowerCase()}.svg`

              }

            });
            

            function comparePriceUp(a,b){
               if(a.price < b.price){
                 return 1;
                }
              if(a.price > b.price){
                return -1;
                }
              return 0;}

              function comparePriceDown(a,b){
               if(a.price < b.price){
                 return -1;
                }
              if(a.price > b.price){
                return 1;
                }
              return 0;}

              function compareChangePerUp(a,b){
               if(a.changesPercentage < b.changesPercentage){
                 return 1;
                }
              if(a.changesPercentage > b.changesPercentage){
                return -1;
                }
              return 0;}

              function compareChangePerDown(a,b){
               if(a.changesPercentage < b.changesPercentage){
                 return -1;
                }
              if(a.changesPercentage > b.changesPercentage){
                return 1;
                }
              return 0;}

              function compareSymbolUp(a,b){
               if(a.symbol < b.symbol){
                 return 1;
                }
              if(a.symbol > b.symbol){
                return -1;
                }
              return 0;}

              function compareSymbolDown(a,b){
               if(a.symbol < b.symbol){
                 return -1;
                }
              if(a.symbol > b.symbol){
                return 1;
                }
              return 0;}



              this.cryptocurrenciesPriceSortUp.sort(comparePriceUp)
              this.cryptocurrenciesPriceTop = this.cryptocurrenciesPriceSortUp.slice(0,5)

              this.cryptocurrenciesPriceSortDown.sort(comparePriceDown)

              this.cryptocurrenciesChangePerSortUp.sort(compareChangePerUp)
              this.cryptocurrenciesChangePerSortDown.sort(compareChangePerDown)

              this.cryptocurrenciesSymbolSortUp.sort(compareSymbolUp)
              this.cryptocurrenciesSymbolSortDown.sort(compareSymbolDown)






          })
//get currencies
          axios.get(`https://financialmodelingprep.com/api/v3/fx?apikey=e54b9be55cc7979ffc747aee03234d33`)
            .then(res =>{
              this.currencies = res.data

                this.currencies = this.currencies.map(cc =>{
                  return{
                    ticker: cc.ticker,
                    changes: cc.changes,
                    bid: cc.bid,
                    img: `https://financialmodelingprep.com/currencies/${cc.ticker.toLowerCase()}.png`,

                  }

                });
              this.currenciesTop = this.currencies.slice(0,5)

            })
// get gainers
        axios.get(`https://financialmodelingprep.com/api/v3/gainers?apikey=e54b9be55cc7979ffc747aee03234d33`)
          .then(res=>{
              this.gainers =res.data
              this.gainersTop = this.gainers.slice(0,5)
          })
// get losers
           axios.get(`https://financialmodelingprep.com/api/v3/losers?apikey=e54b9be55cc7979ffc747aee03234d33`)
          .then(res=>{
              this.losers =res.data
              this.losersTop = this.losers.slice(0,5)
          })
  },
  computed:{
    computedTableData(){
      if(!this.tableData) return []
      else{
        const firstIndex =  (this.pagination.page -1) * this.pagination.perPage
        const lastIndex = this.pagination.page * this.pagination.perPage
       
        return this.tableData.slice(firstIndex,lastIndex)
      }
    }
  },
  methods:{
  
    updateA(stock){
      this.getInfoStock(stock)
      this.getValueCompany(stock)
      this.getChart(stock)
      this.getChartPie(stock)
      this.getTablePagination(stock)
      

    },
 //    선생님 this is my function on error not worked
    replaceByDefault(e) {
      e.target.src = "https://financialmodelingprep.com/currencies/eur/usd.png"
    },
   
    getTablePagination(stock) {
            axios.get(`https://financialmodelingprep.com/api/v3/income-statement/${stock}?period=quarter&limit=400&apikey=e54b9be55cc7979ffc747aee03234d33`)
                .then(({ data }) => {
                    this.tableData = data       
                })
        },
        getChartPie(stock){
            axios.get(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${stock}?period=quarter&limit=1&apikey=e54b9be55cc7979ffc747aee03234d33`)
                .then(res =>{
                    this.bss = res.data[0]
                    this.cash = this.bss.cashAndCashEquivalents
                    this.receivables = this.bss.netReceivables
                    this.inventories = this.bss.inventory
                    this.ppe = this.bss.propertyPlantEquipmentNet
                    this.goodwill=this.bss.goodwill
                    this.LTInvestments = this.bss.longTermInvestments
                    this.Payables = this.bss.accountPayables
                    this.STDebt = this.bss.shortTermDebt
                    this.LTDebt = this.bss.longTermDebt
                    this.defRevenue = this.bss.deferredRevenue
                    this.taxLiab = this.bss.deferredTaxLiabilitiesNonCurrent

                    var dataAssets = [{
                        type: "pie",
                        values: [this.cash, this.receivables, this.inventories, this.ppe, this.goodwill, this.LTInvestments],
                        labels: ["Cash", "receivables", "inventories", "ppe","goodwill","LTInvestments"],
                        textinfo: "label+percent",
                        textposition: "outside",
                        title:"Asset",
                        automargin: true
                      }]

                    var dataLiabilities = [{
                        type: "pie",
                        values: [this.Payables, this.STDebt, this.LTDebt, this.defRevenue, this.taxLiab],
                        labels: ["Payables", "STDebt", "LTDebt","defRevenue","taxLiab"],
                        textinfo: "label+percent",
                        textposition: "outside",
                        title:"Liabilities",
                        automargin: true
                      }]
                      var layout = {
                        height: 400,
                        width: 400,
                        showlegend: false
                        }
                     
                      Plotly.newPlot('assets', dataAssets, layout)
                      Plotly.newPlot('liabilities', dataLiabilities, layout)
                })
        },
          getChart(stock) {
            axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?timeseries=10000&apikey=e54b9be55cc7979ffc747aee03234d33`)
                .then(res => {
                    this.historical = res.data.historical;
                    for ( this.i of this.historical) {
                        this.open.push(this.i.open);
                        this.x.push(this.i.date);
                        this.close.push(this.i.close);
                        this.high.push(this.i.high);
                        this.low.push(this.i.low);
                    }
                    var trace1 = {

                        x: this.x,
        
                        close: this.close,
        
                        decreasing: { line: { color: '#7F7F7F' } },
        
                        high: this.high,
        
                        increasing: { line: { color: '#17BECF' } },
        
                        line: { color: 'rgba(31,119,180,1)' },
        
                        low: this.low,
        
                        open: this.open,
        
                        type: 'candlestick',
                        xaxis: 'x',
                        yaxis: 'y'
                    };
        
                    var data = [trace1];
        
                    var layout = {
                        dragmode: 'zoom',
                        margin: {
                            r: 10,
                            t: 25,
                            b: 40,
                            l: 60
                        },
                        showlegend: false,
                        xaxis: {
                            autorange: true,
                            rangeslider: { range: [this.x[0], this.close[this.x.length-1]] },
                            title: 'Date',
                            type: 'date'
                        },
                        yaxis: {
                            autorange: true,
                            
                            type: 'linear'
                        }
                    };
                    Plotly.newPlot('chart', data, layout);
                })
            
        },
        getValueCompany(stock) {
            axios.get(`https://financialmodelingprep.com/api/v3/ratios-ttm/${stock}?apikey=e54b9be55cc7979ffc747aee03234d33`)
                .then(res => {
                    
                    this.companyValue = res.data[0]
                    this.PBValueRatio = this.companyValue.priceBookValueRatioTTM.toFixed(2)
                    this.ROA = this.companyValue.returnOnAssetsTTM.toFixed(2) * 100
                    this.priceToSale = this.companyValue.priceToSalesRatioTTM.toFixed(2)
                    this.priceEarningRatio = this.companyValue.priceEarningsRatioTTM.toFixed(2)
                    this.ROE = this.companyValue.returnOnEquityTTM.toFixed(2) * 100
                    this.grossProfitMargin = this.companyValue.grossProfitMarginTTM.toFixed(2) * 100

                })
        },
            getInfoStock(stock) {
            axios.get(`https://financialmodelingprep.com/api/v3/profile/${stock}?apikey=e54b9be55cc7979ffc747aee03234d33`)
                .then(res => {                  
                    this.company = res.data[0]
                    this.beta = this.company.beta.toFixed(2)
                    this.ceo = this.company.ceo
                    this.companyName = this.company.companyName
                    this.sector = this.company.sector
                    this.price = this.company.price.toFixed(2)
                    this.description = this.company.description
                    this.image = this.company.image
                })
        }
  }

}
</script>
  
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  background: #f1f1f1;
}
*{
  box-sizing: border-box;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


/* ----Search---- */
form{
  margin-bottom: 50px;
  overflow: hidden;
}

form input[type=text] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: #f1f1f1;
}
form input[type=text]:focus{
  border: 2px solid #0b7dda;
  outline: #0b7dda;
}
form button {
  float: left;
  width: 20%;
  padding: 10px;
  background: #2196F3;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none;
  cursor: pointer;
}

form button:hover {
  background: #0b7dda;
}
#news{
  cursor: pointer;
  font-weight: 700;
  font-size: 2em;

}
#list-all-code{
  cursor: pointer;
  font-weight: 700;
  font-size: 2em;
  margin-left: 50px ;
}
a{
  text-decoration: none;
  background-color: white;
}
.article-news{
  display: grid;
  grid-template-columns: 1fr 4fr;
  border: 1px solid #42b983;
  margin: 10px 0;
  padding: 5px;
  column-gap: 20px;
  border-radius: 5px;
  
}
img.img-article{
  width: 100%;
  height: 100%;
  border-radius: 5px;

}
.site{
  text-align: end;
}
.article-des{
  display: grid;
  row-gap: 5px;
}
.title{
  font-size: 30px;
  font-weight: bold;
}
.article-news:hover .title{
  color: #04703f;


}
.article-news:hover{
  transform: translateY(2px);
  transition: transform 0.2s ease 0s;

}

.article-ccs{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid white;
  border-radius: 4px;
  margin: 2px 0;
  grid-template-rows: 30px;
  align-items: center ;
  text-align: center;
}

.article-ccs-all{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border: 1px solid white;
  border-radius: 4px;
  margin: 2px 0;
  grid-template-rows: 30px;
  align-items: center ;
  text-align: center;
}
.article-ccs:hover{
  transform: translateY(2px);
  transition: transform 0.2s ease 0s;
}
.body{
  display: grid;
  grid-template-columns: 7fr 3fr;
  column-gap: 20px
}

.cryptocurrency{
  display: grid;
  margin: 3px 0;
  
}
.ccs-symbol{
  font-weight: 900;
}

.increase{
  background: #d6ffef;
  border-radius: 10px;
  padding: 2px;
  font-weight: 700;
}
.decrease{
    background: #ffdede;
  border-radius: 10px;
  padding: 2px;
  font-weight: 700;
  color: #e74c3c;
}
.notChange{
  padding: 2px;
  font-weight: 700;
}


.price{
  font-weight: 700;
}
.block{
  display: block !important;
}

h2#toggleCC{
  cursor: pointer;
}
h2#toggleC{
  cursor: pointer;
}
.none{
  display: none;
}
.back{
  cursor: pointer;
}

#pdown, #pup{
  cursor: pointer;
}
</style>
