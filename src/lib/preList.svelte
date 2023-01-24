<script lang="ts">
  import { AddPre, AddWeight, MinusWeight, preList } from "../store";
  import { Button, Input, Loader, TextInput } from "@svelteuidev/core";
  let preAdd: string = "";
  const onAddPre = () => {
    AddPre(preAdd)
    AddWeight(preAdd)
  };
</script>
<h2>排行</h2>
<div class="preList-root">
  
  {#each $preList == "" ? [] : $preList
        .split(",")
        .map((e) => {
          return { name: e, weight: Number.parseInt(localStorage[e + ":weight"] || "1") };
        })
        .sort((a, b) => a.weight - b.weight)
        .reverse() as e, i}
    <div class="item-parent">
      <div class="item">
        <b class="num"> {`NO.${i + 1}  :  `}</b>
        {#if i==0}
        <b style="font-size: 20px;" class="rainbow-text"> {` ${e.name}   `} </b>
        {/if}
        {#if i!=0}
        <b > {` ${e.name}   `} </b>
        {/if}
        <b class="tag"> {`   [${e.weight}]`}</b>
      </div>
      <img
      src="./thumb-up-line.svg"
      alt="down Logo"
        class="arrow"
        on:mousedown={() => {
          AddWeight(e.name)
        }}
      />
     
      <img
      src="./thumb-down-line.svg"
      alt="down Logo"
        class="arrow"
        on:mousedown={() => {
          MinusWeight(e.name)
        }}
      />

   
    </div>
  {/each}
  <div class="line">
    <Input id="pre-add" bind:value={preAdd} placeholder="直接入榜+1" />
    <div class="button-87">
        <Button  on:click={onAddPre}>上榜</Button>
    </div>
  </div>
</div>
<h2>选字统计</h2>
<canvas class="canvas" id="wordChart" />
<h2>声调统计</h2>
<canvas class="canvas" id="toneChart" />

<style>
  .preList-root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .item-parent {
    display: -webkit-inline-box;
    display: flex;
    height: 50px;

  }
  .item {
    left: 20%;
    /* flex-direction: initial; */
    /* justify-items: center; */
    /* align-items: center; */
    text-align: center;
    line-height: 50px;
    height: 50px;
    /* white-space: nowrap; */
    margin-right: 10px;
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
  .line {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  .button-87 {
    margin-left: 10px;
  }
  .canvas{
    max-width: 1000px;
  }
  h2{
    border-top: 1px solid #eaecef;
    padding-top: 10px;
  }
  .num{
    margin-right: 20px;
    font-size: 10px;
  }
  .tag{
    font-size: 10px;
    margin-left: 20px;
  }
</style>
