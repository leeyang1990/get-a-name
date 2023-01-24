<script lang="ts">
  import { Button, Input, Loader, TextInput } from "@svelteuidev/core";
  import Table from "./table.svelte";
  import { firstName, preStr } from "../store";
  const random = () => {
    let item = _data.sort(() => 0.5 - Math.random())[0];
    curName = item.name;
  };
  const gen = () => {
    _data = [];
    // isExpand.set(true)
    isBottomShow = true;
    isExpand = true;
    for (let i = 0; i < $preStr.length; i++) {
      const e = $preStr[i];
      for (let j = 0; j < $preStr.length; j++) {
        const ee = $preStr[j];
        if (_data.findIndex((eee) => eee.name == $firstName + e + ee) == -1) {
          _data.push({
            name: $firstName + e + ee,
          });
        }
      }
    }
  };
  let curName = "挑个名字";

  let _data = [];

  let isExpand = false;
  const expand = () => {
    isExpand = !isExpand;
  };
  let isBottomShow = false;
</script>

<h1>{curName}</h1>
<div class="pick">
  <div class="line input-87">
    <label>姓</label>
    <div id = "first-name">
      <Input  bind:value={$firstName} placeholder="输入姓" />
    </div>
  </div>

  <div class="line ">
    <label>备选字</label>
    <textarea id="pre-str" bind:value={$preStr} placeholder="输入备选字" />
    <div class="button-87">
      <Button on:click={gen}>排列组合</Button>
    </div>
  </div>

  {#if isBottomShow}
    <div class="table">
      <div class="line">
        <div class="button-87">
          <Button class="button-87" on:click={random}>roll一个</Button>
        </div>
        <div class="button-87">
          <Button class="button-87" on:click={expand}
            >{isExpand ? "收起" : "展开"}</Button
          >
        </div>
      </div>

      {#if isExpand}
        <Table data={_data} />
      {/if}
    </div>
  {/if}
</div>

<style>
  .table{
    margin-top: 20px;
  }
  .pick {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .line {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .button-87 {
    margin-left: 10px;
  }
  #first-name{
    width: 400px;
  }
  #pre-str{
    width: 300px;
  }
  label{
    line-height: 40px;
    margin-right: 10px;
  }
</style>
