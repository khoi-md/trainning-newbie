<template>
  <div>
    <div class="import-upload"
      v-if="!selectedFile"
      @click="displayFileBrowser"
      :class="{ 'drag-over': isDrag }"
    >
      <div
        class="file-input"
        @dragover.prevent="checkDrag($event, 'new', true)"
        @dragleave.prevent="checkDrag($event, 'new', false)"
        @drop.prevent="onChooseFile"
      >
        <div class="ic--pu-upload icon"></div>
        <div>
          <div class="title">
            {{ $t('unit.organization.detail.drag_drop_file') }}
          </div>
          <div class="description">
            {{ $t('unit.organization.detail.browser_file') }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="import-image"
      :class="{ 'drag-over': isDrag }"
      @dragover.prevent="checkDrag($event, 'new', true)"
      @dragleave.prevent="checkDrag($event, 'new', false)"
      @drop.prevent="onChooseFile"
      @click="displayFileBrowser"
    >
      <img :src="image" />
    </div>
    <label>
      <input
        ref="fileInput"
        type="file"
        hidden
        accept="image/jpeg, image/png, image/jpg"
        allowdirs="false"
        @input="onChooseFile"
    /></label>
    <div v-show="fileSizeError" class="error">{{ fileSizeError }}</div>
    <div v-show="fileTypeError" class="error">{{ fileTypeError }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: '',
    },
  },
  watch: {
    value(val) {
      if (val && val.fileUrl) {
        this.image = val.fileUrl
        this.selectedFile = val
        return
      }
      this.selectedFile = null
    },
  },
  data() {
    return {
      isDrag: false,
      selectedFile: null,
      validationErrors: {},
      fileTypeError: '',
      fileSizeError: '',
      fileId: '',
      allowExts: 'image/jpg, image/jpeg, image/png',
      image: '',
    }
  },
  methods: {
    displayFileBrowser() {
      this.$refs.fileInput.click()
    },
    checkDrag(event, key, status) {
      if (status && event.dataTransfer.types === 'text/plain') {
        return
      }
      this.isDrag = status ? key : null
    },
    onChooseFile(event) {
      this.isDrag = false
      const file = event.target.files ? event.target.files[0] : event.dataTransfer.files[0]
      if (file.length === 0) {
        return
      }
      this.fileSizeError = ''
      this.fileTypeError = ''
      this.selectedFile = file

      const ext = this.getExt(this.selectedFile.name)
      if (this.allowExts.indexOf(ext) === -1) {
        this.fileTypeError = this.$t('unit.organization.detail.error.format_error')
        return
      }
      if (this.selectedFile.size > 10000000) {
        this.fileSizeError = this.$t('unit.organization.detail.error.size_error')
        return
      }

      this.$emit('chooseFile', file)

      this.loadFile(file)
    },
    getExt(filename) {
      const pos = filename.lastIndexOf('.')
      if (pos === -1) return ''
      return filename.slice(pos + 1)
    },
    loadFile(file) {
      const reader = new FileReader()

      reader.onload = e => {
        const result = e.target.result
        this.image = result
      }
      
      if (file) {
        reader.readAsDataURL(file)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.import {
  &-upload {
    background: #f8f8f8;
    width: 100%;
    height: 232px;
    text-align: center;
    padding: 40px;
    color: #333;
    cursor: pointer;

    .icon {
      width: 100%;
      height: 32px;
      background-size: 32px;
      background-repeat: no-repeat;
      position: relative;
      left: 50%;
      transform: translateX(-15px);
      margin-bottom: 12px;
    }

    .title {
      font-size: 18px;
      font-weight: 700;
    }

    .description {
      font-size: 18px;
      text-decoration: underline;
    }

    label {
      display: none;
    }
  }

  &-image {
    cursor: pointer;
    height: 215px;
    width: 311px;

    img {
      object-fit: cover;
    }
    
    &.drag-over {
      color: #999;
      border: #999;
      background: #dcdcdc;
      opacity: 0.3;
    }
  }
}
</style>