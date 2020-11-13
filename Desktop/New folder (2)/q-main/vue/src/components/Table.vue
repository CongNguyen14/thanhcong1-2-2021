<template>
           <div class="table">
            <table >
                <thead>
                    <tr>
                        <th v-for="(obj, ind) in config" :key="ind">{{obj.key}} </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in theData" :key="index" >
                        <td v-for="(obj, ind) in config" :key="ind">{{row[obj.title]}}</td>
                    </tr>
                </tbody>
            </table>
               <h2>Table: Income Statement</h2>

        
        </div>
</template>

<script>
export default {
    props:[
        'theData', 'config'
    ]
}
</script>

<style>
    table{
        border-collapse: collapse;
        width: 100%;
    }

    table, td, th {
        border: 1px solid black;
    }
    th{
        height: 30px;
        background-color: #7a7a7a;
    }  
    td{
        text-align: center;
        height: 30px;
    } 


    tr:nth-child(even) {
        background-color:  #cec6c6;
    }

   .table h2{
        text-align: center;
    }
</style>