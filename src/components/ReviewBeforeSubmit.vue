<template>
    <div>
        <LoadingModal :visible="isLoading" />
        <div v-if="showMessage" :style="{ padding: '10px', backgroundColor: messageColor }">
            <h2>Message</h2>
            <p>{{ message }}</p>
        </div>
        <h1>Child Name</h1>
        <div>
            <input v-model="babyDetails.childName" type="text" />
        </div>
        <h1>Bottles</h1>
        <div class="margin-bottom">
            <label for="bottleAmountInOz">Bottle Amount: </label>
            <input type="number" class="short" v-model="bottleAmountInOz" id="bottleAmountInOz" /> oz
        </div>
        <div v-for="(bottle, index) in babyDetails?.bottles" :key="index">
            <input v-model="babyDetails.bottles[index]" type="text" class="time" />
            <button class="margin-left delete-button" @click="removeBottle(index)">X</button>
        </div>
        <button class="margin-top" @click="addBottle">Add Bottle</button>
        <h1>Naps</h1>
        <div v-for="(nap, index) in babyDetails?.naps" :key="index">
            Start: <input v-model="babyDetails.naps[index].startTime" type="text" class="time" />
            End: <input v-model="babyDetails.naps[index].endTime" type="text" class="time" />
            <button class="margin-left delete-button" @click="removeNap(index)">X</button>
        </div>
        <button class="margin-top" @click="addNap">Add Nap</button>
        <h1>Diapers</h1>
        <div v-for="(diaper, index) in babyDetails?.diapers" :key="index">
            Time: <input v-model="babyDetails.diapers[index].time" type="text" class="time" />
            BM: <input v-model="babyDetails.diapers[index].isBm" type="checkbox" />
            Wet: <input v-model="babyDetails.diapers[index].isWet" type="checkbox" />
            <button class="margin-left delete-button" @click="removeDiaper(index)">X</button>
        </div>
        <button class="margin-top" @click="addDiaper">Add Diaper</button>
        <div class="margin-top">
            <button @click="goBack">Back</button>
        </div>
        <div class="margin-top">
            <button style="padding: 15px" @click="submitToBc">Submit</button>
        </div>
    </div>
</template>

<script>
import getApiBaseUrl from '../assets/api-util'
import LoadingModal from './LoadingModal.vue';

const EMPTY_BABY_DETAILS = {
    bottles: [],
    naps: [],
    diapers: []
}

export default {
    props: ['inputBabyDetails'],
    inject: ['getOcrData'],
    components: {
        LoadingModal
    },
    data() {
        return {
            showMessage: false,
            messageColor: '#000',
            message: null,
            isLoading: false,
            babyDetails: JSON.parse(JSON.stringify(EMPTY_BABY_DETAILS)),
            bottleAmountInOz: 5
        }
    },
    methods: {
        removeBottle(index) {
            this.babyDetails.bottles.splice(index, 1)
        },
        addBottle() {
            this.babyDetails.bottles.push('')
        },
        removeNap(index) {
            this.babyDetails.naps.splice(index, 1)
        },
        addNap() {
            this.babyDetails.naps.push({ startTime: '', endTime: '' })
        },
        removeDiaper(index) {
            this.babyDetails.diapers.splice(index, 1)
        },
        addDiaper() {
            this.babyDetails.diapers.push({
                time: '',
                isBm: false,
                isWet: false
            })
        },
        goBack() {
            this.$router.push({
                name: 'ImageUpload'
            })
        },
        showErrorMessage(message) {
            this.showMessage = true
            this.messageColor = '#AB2328'
            this.message = message
        },
        showInfoMessage(message) {
            this.showMessage = true
            this.messageColor = '#154734'
            this.message = message
        },
        addAmountToBottles() {
            this.babyDetails.bottles = this.babyDetails.bottles.map(bottleTime => { return { time: bottleTime, amountInOz: this.bottleAmountInOz.toString() }})
        },
        async submitToBc() {
            this.isLoading = true

            this.addAmountToBottles()

            try {
                console.log(JSON.stringify(this.babyDetails))
                const res = await fetch(`${getApiBaseUrl()}/bc`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.babyDetails)
                })
    
                console.log(res)

                if(res.status != 200) {
                    console.log('error!')
                    const data = await res.json()
                    this.showErrorMessage(data.errorMessage)
                    // change page to only reflect baby details that haven't been logged yet
                    const unloggedData = data.unloggedData
                    // convert bottle objects back from an object to time strings, since that's what the UI
                    // is working with
                    unloggedData.bottles = unloggedData.bottles.map(bottle => bottle.time)
                    this.babyDetails = unloggedData
                } else {
                    console.log('success!')
                    this.showInfoMessage('Success!')
                    this.babyDetails = JSON.parse(JSON.stringify(EMPTY_BABY_DETAILS))
                }
            } catch (err) {
                console.log(err)
            } finally {
                this.isLoading = false
            }
        }
    },
    mounted() {
        if(this.getOcrData()) {
            this.babyDetails = this.getOcrData()
        }
    }
}
</script>

<style scoped>
button {
    padding: 10px
}
.delete-button {
    padding: 1px 6px 1px 6px;
    color: white;
    background-color: #AB2328;
    border: none;
}
.time, .short {
    max-width: 70px;
}
.margin-left {
    margin-left: 20px;
}

.margin-top {
    margin-top: 20px;
}

.margin-bottom {
    margin-bottom: 20px;
}
</style>