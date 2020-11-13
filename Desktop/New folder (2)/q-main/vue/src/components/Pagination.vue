<template>
  <section>
    <div class="pagination">
      <i class="fas fa-angle-double-left" @click="changePage(0)"></i>
      <i class="fas fa-angle-left"  @click="changePage(-1)"></i>
      <div>
        Showing Page {{page}} of {{pages}}
      </div>
      <i class="fas fa-angle-right" @click="changePage(1)"></i>
      <i class="fas fa-angle-double-right"  @click="changePage(pages)"></i>
    </div>
  </section>
</template>

<script>
export default {
    props:['totalRecords','perPageOptions'],
    data: function (){
        return {
             page: 1,
             perPage: this.perPageOptions
        }
        
    },
     
    computed:{
        pages (){
            const remainder = this.totalRecords % this.perPage

            if(remainder > 0){
                return Math.floor(this.totalRecords / this.perPage) +1
            }
            else return this.totalRecords / this.perPage
        }
    },
    methods:{
        changePage(value){
            switch(value){
                case 0: this.page =1; break;
                case -1: this.page = this.page > 1 ? this.page-1 : this.page ; break
                case 1: this.page = this.page < this.pages ? this.page + 1 : this.page; break
                case this.pages: this.page = this.pages; break  
            }
            this.$emit('input',{page: this.page, perPage: this.perPage})
        }
    }
   
   
};
</script>

<style >
  .pagination{
    display: flex;
    justify-content: flex-end;
  }
  .pagination i,div{
    margin-right: 20px;
  }
  i{
    cursor: pointer;
  }
  section{
    margin-bottom: 20px;
  }
</style>