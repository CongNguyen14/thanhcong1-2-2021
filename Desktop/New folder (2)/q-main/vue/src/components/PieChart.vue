<template>

    <div class="pieChart-container">
        <div class="pieChart">
            <div></div>
            <div id="assets"></div>
            <div id="liabilities"></div>
            <div></div>
        </div>
        <h2>Chart: Assets and Liabilities</h2>

    </div>
   
</template>

<script>
export default {
    props:['bss','cash','receivables','inventories','ppe','goodwill',
    'LTInvestments','Payables','STDebt','LTDebt','defRevenue','taxLiab']
}
</script>

<style >
    .pieChart-container{
        margin-left: 50px;
        margin-top: 50px;

    }
    .pieChart{
        display: grid;
        grid-template-columns: 0.4fr 1fr 1fr 0.2fr;

    }
    .pieChart-container h2{
        text-align: center;
    }
</style>