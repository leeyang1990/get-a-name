<script lang="ts">
  export let name: string = "";
  export let isPre: boolean = false;
  import { Checkbox } from '@svelteuidev/core';
  import { AddPre, AddWeight, GetWeight, HasPre, MinusWeight, preList, RemovePre } from "../store";

  isPre = HasPre(name);

  const onChange = (e) => {

    if (e.target.checked) {
      if (GetWeight(name) == 0) {
        AddWeight(name)
      }
      AddPre(name)
    } else {
      RemovePre(name)
    }
  };

  const add = ()=>{
    AddWeight(name)
  }
  const minus = ()=>{
   var isRmovePre =  MinusWeight(name)
   if(isRmovePre){
    isPre = false
   }
  }
</script>

<div class="item">
  {name}
  <div class="checkbox-87">
  <Checkbox checked={$preList==null?HasPre(name):HasPre(name)} on:click={onChange} />
  </div>

  <!-- <img src="./thumb-up-line.svg"
  alt="down Logo" class="arrow" on:mousedown={add}/>
  <img src="./thumb-up-line.svg"
  alt="down Logo" class="arrow" on:mousedown={minus}/> -->
</div>

<style>
  .item {
    width: 100px;
    display: flex;
    flex-direction: initial;
    /* justify-items: center; */
    /* align-items: center; */
    text-align: center;
    line-height: 40px;
    height: 40px;
    white-space: nowrap;
  }

  .arrow {
    width: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    line-height: 25px;
    margin-right: 10px;
  }
  .arrow:hover {
    /* outline: 1px solid red; */
    filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
  }
  .checkbox-87{
    margin-left: 10px;
    display: flex;
  }
</style>
