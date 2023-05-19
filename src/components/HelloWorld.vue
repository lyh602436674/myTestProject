<template>
  <div class="hello">
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column prop="type" label="做法" width="180"> </el-table-column>
      <el-table-column prop="group" label="分组"> </el-table-column>
      <el-table-column prop="name" sortable label="做法/小料名称">
      </el-table-column>
      <el-table-column prop="money" sortable label="加价"> </el-table-column>
      <el-table-column prop="other" sortable label="最后修改人">
      </el-table-column>
    </el-table>
    <div>
      <h1>给图片添加水印</h1>
      <h-watermark></h-watermark>
    </div>
  </div>
</template>

<script>
import HWatermark from "./HWatermark.vue";
export default {
  name: "HelloWorld",
  components: { HWatermark },
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          type: "做法",
          group: "辣度aaa",
          name: "珍珠1",
          money: 1111,
          other: "哈哈哈哈",
        },
        {
          id: "12987122",
          type: "做法",
          group: "辣度aaa",
          name: "珍珠2",
          money: 2222,
          other: "哈哈哈哈",
        },
        {
          id: "12987122",
          type: "做法",
          group: "甜度bbb",
          name: "珍珠3",
          money: 3333,
          other: "哈哈哈哈",
        },
        {
          id: "12987122",
          type: "做法",
          group: "甜度bbb",
          name: "珍珠4",
          money: 4444,
          other: "哈哈哈哈",
        },
        {
          id: "12987122",
          type: "小料",
          group: "辣度aaa",
          name: "珍珠5",
          money: 5555,
          other: "哈哈哈哈",
        },
        {
          id: "12987122",
          type: "小料",
          group: "辣度aaa",
          name: "珍珠6",
          money: 6666,
          other: "哈哈哈哈",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    mergeComon(id, rowIndex) {
      // 合并单元格
      let idName = this.tableData[rowIndex][id];
      if (rowIndex > 0) {
        if (this.tableData[rowIndex][id] != this.tableData[rowIndex - 1][id]) {
          let i = rowIndex;
          let num = 0;
          while (i < this.tableData.length) {
            if (this.tableData[i][id] === idName) {
              i++;
              num++;
            } else {
              i = this.tableData.length;
            }
          }
          return {
            rowspan: num,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 1,
          };
        }
      } else {
        let i = rowIndex;
        let num = 0;
        while (i < this.tableData.length) {
          if (this.tableData[i][id] === idName) {
            i++;
            num++;
          } else {
            i = this.tableData.length;
          }
        }
        return {
          rowspan: num,
          colspan: 1,
        };
      }
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return this.mergeComon("type", rowIndex);
      }
      if (columnIndex === 1) {
        return this.mergeComon("group", rowIndex);
      }
    },
  },
};
</script>

<style scoped>
</style>
