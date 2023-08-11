<template>
    <div>
        <LoadingModal :visible="isLoading" />
        <h1>Upload Daily Report</h1>
        <input ref="file" type="file" accept="image" @change="uploadImage" style="display: none;" />
        <input id="upload-button" type="button" value="Upload Image" @click="this.$refs.file.click();" />
        <div style="margin-top: 20px;">
            <input type="checkbox" name="skipOcr" v-model="skipOcr"/>
            <label for="skipOcr">Skip OCR</label>
        </div>
    </div>
</template>

<script>
import getApiBaseUrl from '../assets/api-util'
import LoadingModal from './LoadingModal.vue';

export default {
    components: {
        LoadingModal
    },
    inject: ['setOcrData'],
    data() {
        return {
            isLoading: false,
            skipOcr: false
        }
    },
    methods: {
        async uploadImage() {
            this.isLoading = true

            try {
                const image = this.$refs.file.files[0]
    
                const formData = new FormData();
                formData.append('file', image);
    
                let queryParams = ''
                if(this.skipOcr) {
                    queryParams = 'skipOcr=true'
                }
    
                const res = await fetch(`${getApiBaseUrl()}/ocr?${queryParams}`, {
                    method: 'POST',
                    body: formData
                })
    
                if(res.status != 200) {
                    console.log('error!')
                    this.isLoading = false
                } else {
                    console.log('success!', res)
                    const json = await res.json()
                    this.setOcrData(json)
                    this.$router.push({
                        name: 'ReviewBeforeSubmit'
                    })
                }
            } catch (err) {
                this.isLoading = false
            }
        }
    }
}
</script>

<style>
body {
    background-color: #222
}

h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 40px;
    color: #fff
}

#upload-button {
    background-color: #fff;
    padding: 15px;
    border: none;
    border-radius: 8px;
    transition: 0.3s;
}

#upload-button:hover {
    background-color: #ff1d5e;
}

</style>