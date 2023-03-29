<template>
  <div>
    <el-card class="each-card" shadow="hover">
      <!--            总是显示-->
      <el-col :span="24" class="each-card-content">
        <div class="grid-content bg-purple code-title">
          <h3 style="margin-bottom: 10px">
            {{ blog.title }}
          </h3>

          <div style="overflow:hidden; font-weight: normal">
            <el-row :gutter="10">
              <el-col :span="7">
                <div class="grid-content bg-purple">发布人: <span class="authorClass">{{ " " + blog.author }}</span>
                </div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple-light">发布时间：<span class="authorClass">{{
                    blog.commitTime
                  }}</span></div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">使用语言：
                  <el-tag size="small">{{ blog.codeLanguage }}</el-tag>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">描述：{{ blog.description }}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple" style="font-weight: lighter;">备注：<span
                    class="remarkClass">{{ blog.remark }}</span></div>
              </el-col>
            </el-row>
            <el-col :span="24">

            </el-col>
          </div>
        </div>
      </el-col>
    </el-card>


    <div class="code-region">
      <el-col :span="4">
        <el-form label-width="100px" size="small">
          <el-form-item label="语言:">
            <el-select v-model="modeVal" @change="handleChangeMode">
              <el-option
                  v-for="item in modeOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主题:">
            <el-select v-model="themeVal" @change="handleChangeTheme">
              <el-option
                  v-for="item in themeOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字体大小:">
            <el-input
                v-model="fontsizeVal"
                min="18"
                type="number"
                @change="handleChangeOption(+$event, 'fontSize')"
            />
          </el-form-item>
          <el-form-item label="显示行号:">
            <el-switch
                v-model="islineNumbers"
                @change="handleChangeOption($event, 'showLineNumbers')"
            />
          </el-form-item>
          <el-form-item label="高亮激活行:">
            <el-switch
                v-model="isHighlightActiveLine"
                @change="handleChangeOption($event, 'highlightActiveLine')"
            />
          </el-form-item>
          <el-form-item label="显示边槽:">
            <el-switch
                v-model="isGutter"
                @change="handleChangeOption($event, 'showGutter')"
            />
          </el-form-item>
          <el-form-item label="只读:">
            <el-switch
                v-model="readOnly"
                @change="handleChangeOption($event, 'readOnly')"
            />
          </el-form-item>
          <el-form-item label="提示&补全:">
            <el-switch
                v-model="enableBasicAutocompletion"
                @change="handleChangeAutoCompletion"
            />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="20" class="editor-region-main">
        <div id="ace-editor" class="editor-region"></div>
      </el-col>
    </div>
  </div>
</template>

<script>
// import { content } from "../content.js";
import ace from "ace-builds";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";

export default {
  name: "AceEditor",
  data() {
    return {
      blog: {
        title: "",
        author: "",
        commitTime: "",
        codeLanguage: "",
        remark: "",
        description: ""
      },
      aceEditor: null,
      modeVal: "javascript",
      themeVal: "tomorrow_night",
      fontsizeVal: 18,
      islineNumbers: true,
      codeLanguage: "java",
      codeContent: "code here",
      isHighlightActiveLine: true,
      isGutter: true,
      readOnly: false,
      enableBasicAutocompletion: false,
      modeOptions: [
        {
          label: "javascript",
          value: "javascript",
        },
        {
          label: "json",
          value: "json",
        },
        {
          label: "html",
          value: "html",
        },
        {
          label: "java",
          value: "java",
        },
        {
          label: "go",
          value: "go",
        },
        {
          label: "python",
          value: "python",
        },

      ],
      themeOptions: [
        {
          label: "TextMate",
          value: "textmate",
        },
        {
          label: "Tomorrow",
          value: "tomorrow",
        },
        {
          label: "Tomorrow Night",
          value: "tomorrow_night",
        },
        {
          label: "Monokai",
          value: "monokai",
        },
      ],
    };
  },
  mounted() {
    const _this = this;
    // this.$nextTick(() => {
    _this.aceEditor = ace.edit(document.getElementById("ace-editor"), {
      // value: content[_this.modeVal],
      value: this.codeContent,
      theme: "ace/theme/" + _this.themeVal,
      mode: "ace/mode/" + _this.modeVal,
      minLines: 20,
      maxLines: 20,
    });
    this.aceEditor.setOption("fontSize", 19);
    // });
  },
  methods: {
    initData() {
      const _this = this;
      ///codeId?code=
      // debugger
      let id = window.location.href.split("codeId?")[1].replace("code=", "");
      _this.$axios.get("/codeShare?codeId=" + id).then(res => {
        _this.codeContent = res.data.data.content;
        _this.modeVal = res.data.data.codeLanguage;

        _this.codeContent = res.data.data.content;
        _this.blog.author = res.data.data.author;
        _this.blog.remark = res.data.data.remark;
        _this.blog.codeLanguage = res.data.data.codeLanguage;
        _this.blog.commitTime = res.data.data.commitTime;
        _this.blog.description = res.data.data.description;
        _this.modeVal = res.data.data.codeLanguage;

        this.handleCode();
        // _this.currentPage = res.data.data.current;
        // _this.total = res.data.data.total;
        // _this.pageSize = res.data.data.size;
      }).catch(() => {
        console.log("请求发生错误")
        alert("请求发生错误，请看官稍后重试鸭")
      }).finally(() => {
        this.loading = false;
      });
    },
    handleChangeMode(mode) {
      this.aceEditor.setOptions({
        mode: "ace/mode/" + mode,
        value: this.codeContent,
      });
      // this.aceEditor.setOption("mode", "ace/mode/" + mode)
      // this.aceEditor.setOption("value", content[this.modeVal])
      // this.aceEditor.setMode("ace/mode/" + mode)
    },
    handleChangeTheme(theme) {
      this.aceEditor.setTheme("ace/theme/" + theme);
    },
    handleChangeOption(value, name) {
      this.aceEditor.setOption(name, value);
    },
    handleChangeAutoCompletion(val) {
      this.aceEditor.setOptions({
        enableBasicAutocompletion: val,
        enableSnippets: val,
        enableLiveAutocompletion: val,
      });
    },
    handleCode() {
      this.aceEditor.setOptions({
        value: this.codeContent,
        modeVal: this.codeLanguage,
        mode: "ace/mode/" + this.codeLanguage,
      });
      this.aceEditor.resize()
    }
  },
  created() {
    this.initData()
  }

};
</script>

<style scoped>
#ace-editor {
  position: relative;
  margin-left: 10px;
  border: 1px solid #eee;
  height: 1000px;
}

.each-card {
  width: 70%;
  margin: 0 auto;
  padding-top: 5px;
  height: 150px;
  background: linear-gradient(to bottom right, #74ebd5, #ACB6E5);
  /*background: linear-gradient(to right, #a1c4fd, #c2e9fb);*/
}

.code-region {
  margin-top: 60px;
}

.each-card-content {
  padding-left: 15%;
  padding-bottom: 20px;
}

.authorClass {
  color: #1ea7fd;
  font-family: "AR PL UKai CN";
}

.authorClass:hover {
  color: white;
  font-family: "AR PL UKai CN";
}

.remarkClass {
  color: #8ed2dd;
}

.remarkClass:hover {
  color: #66bf3c;
}

.each-card:hover {
  width: 70%;
  margin: 0 auto;
  padding-top: 5px;
  height: 150px;
  background: linear-gradient(to right, #a1c4fd, #c2e9fb);
  animation: gradient 5s linear infinite;
}

@keyframes gradient {
  0% {
    background-position: left;
  }
  100% {
    background-position: right;
  }
}
</style>
