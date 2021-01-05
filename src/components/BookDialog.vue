<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="yellow darken-1" v-bind="attrs" v-on="on">Ещё</v-btn>
    </template>
    <v-card max-width="600">
      <div class="d-flex justify-end">
        <v-card-actions>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="5">
              <v-avatar class="mx-3" width="200" height="200" tile>
                <v-img :src="book.img"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="12" md="7">
              <p class="text-title">
                <span class="text-body-1 font-weight-bold"
                  >Название книги:</span
                >
                {{ book.title }}
              </p>
              <p class="text-title">
                <span class="text-body-1 font-weight-bold">Авторы книги:</span>
                <span v-for="(author, index) in book.authors" :key="index">{{
                  author.initial_name
                }}</span>
              </p>
              <p class="text-title">
                <span class="text-body-1 font-weight-bold">Дата издания:</span>
                {{ book.publication_date }}
              </p>
              <p v-if="book.language" class="text-body-1 font-weight-regular">
                <span class="font-weight-medium">Язык: </span
                >{{ book.language }}
              </p>
              <p class="text-title" v-if="book.chapter">
                <span class="text-body-1 font-weight-bold">Том:</span>
                {{ book.chapter }}
              </p>
              <p class="text-title red--text" v-if="book.special_books">
                <span class="text-body-1 font-weight-bol"
                  >Разрешено читать только в библиотеке</span
                >
              </p>
              <p class="text-title">
                <span class="text-body-1 font-weight-bold">В наличии:</span>
                {{ book.quantity }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="12" sm="3">
              <v-btn
                :disabled="!book.e_book"
                color="blue darken-1"
                text
                :href="book.file"
                target="_blank"
                >Скачать</v-btn
              >
            </v-col>
            <v-col cols="12" sm="6">
              <v-card flat>
                <v-dialog v-model="datetime" persistent max-width="600">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on="on"
                      readonly
                      prepend-icon="mdi-clock-time-four-outline"
                      label="Выберите время"
                      :value="orderTime"
                    />
                  </template>
                  <v-row align="center" justify="center">
                    <v-card flat>
                      <div class="d-flex justify-end">
                        <v-card-actions>
                          <v-btn icon>
                            <v-icon @click="datetime = false">mdi-close</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </div>
                      <v-card-text>
                        <v-tabs v-model="activeTab">
                          <v-tab key="calendar">
                            <v-icon>mdi-calendar</v-icon>
                          </v-tab>
                          <v-tab :disabled="!date" key="time">
                            <v-icon>mdi-clock-time-four-outline</v-icon>
                          </v-tab>
                          <v-tab-item key="calendar">
                            <v-date-picker
                              :first-day-of-week="1"
                              reactive
                              v-model="date"
                              @input="showTimePicker"
                              width="250"
                              :allowed-dates="
                                val => ![0, 7].includes(new Date(val).getDay())
                              "
                              :min="minDate"
                              :max="maxDate"
                            ></v-date-picker>
                          </v-tab-item>
                          <v-tab-item key="time">
                            <v-time-picker
                              width="270"
                              v-model="time"
                              format="24hr"
                              :min="minTime"
                              :allowed-hours="allowedHours"
                              :allowed-minutes="allowedMinutes"
                            ></v-time-picker>
                            <v-btn @click="prev" class="d-block">Назад</v-btn>
                          </v-tab-item>
                        </v-tabs>
                      </v-card-text>
                      <v-card-actions>
                        <v-row align="center" justify="center">
                          <v-btn
                            text
                            color="primary"
                            v-if="time && date"
                            @click="onSubmit"
                            >Выбрать</v-btn
                          >
                        </v-row>
                      </v-card-actions>
                    </v-card>
                  </v-row>
                </v-dialog>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-btn
                disabled
                color="blue darken-1"
                text
                @click.prevent="orderBook"
                :loading="isLoading"
                >Заказать</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Nprogress from 'nprogress'
export default {
  name: 'BookDialog',
  created() {
    Nprogress.start()
    this.$store.dispatch('book/fetchBook', this.id).then(response => {
      this.book = response
      Nprogress.done()
    })
  },
  data() {
    return {
      activeTab: 0,
      date: '',
      time: '',
      datetime: false,
      isLoading: false,
      dialog: false,
      // bookCount: this.book.real_time_count,
      allowedHours: [9, 10, 11, 12, 13, 14, 15, 16, 17],
      allowedMinutes: [0, 15, 30, 45],
      book: {}
    }
  },
  methods: {
    showTimePicker() {
      this.activeTab = 1
    },
    prev() {
      this.activeTab = 0
    },
    onSubmit() {
      this.$emit('input', this.orderTime)
      this.datetime = false
    },
    orderBook() {
      this.isLoading = true
      this.$store
        .dispatch('order/orderBook', {
          time_of_get: this.orderTime,
          user: this.$store.state.auth.userId,
          book: this.book.id
        })
        .then(() => {
          this.closeDialog()
        })
    },
    closeDialog() {
      this.isLoading = false
      this.dialog = false
      this.activeTab = 0
      this.date = ''
      this.time = ''
    }
  },
  computed: {
    // ...mapGetters({ book: 'book/book' }),
    orderTime() {
      return this.date + ' ' + this.time
    },
    minTime() {
      const date = new Date()
      if (this.date > this.minDate) return
      return date.getHours() + ':' + date.getMinutes()
    },
    minDate() {
      let today = new Date()
      let time = today.toLocaleDateString().split('/')
      time = time[2] + '-' + time[0] + '-' + time[1] + 'T00:00:0.000Z'
      return time
    },
    maxDate() {
      let date = new Date()
      return (
        date.getFullYear() + '-' + (date.getMonth() + 2) + '-' + date.getDate()
      )
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: () => null
    }
  }
}
</script>
