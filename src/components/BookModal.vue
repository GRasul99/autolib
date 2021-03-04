<template>
  <div class="mt-auto">
    <v-dialog v-model="modal" persistent max-width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#3366cc"
          dark
          class="text-capitalize"
          v-bind="attrs"
          v-on="on"
          @click="fetchBook(id)"
        >
          Подробнее
        </v-btn>
      </template>
      <v-card max-width="700">
        <div class="d-flex justify-end">
          <v-card-actions>
            <v-btn icon @click="closeDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
        <div
          class="flex flex-col md:flex-row md:justify-between items-center md:items-start px-4 py-2"
        >
          <img
            :src="book.img"
            alt="Book image"
            class="w-40 md:mr-2"
            height="100%"
          />
          <div class="flex flex-col mt-4 text-gray-600">
            <p>
              Название книги:
              <span class="font-weight-bold">{{ book.title }}</span>
            </p>
            <p v-for="author in book.authors" :key="author.id">
              Автор:
              <span class="font-weight-bold">{{ author.initial_name }}</span>
            </p>
            <p class="mt-auto">
              Год издания:
              <span class="font-weight-bold"
                >{{ book.publication_date }} г.</span
              >
            </p>
            <p class="mt-auto flex font-weight-bold items-center">
              <span class="text-md text-center">Электронная версия:</span>
              <v-btn
                outlined
                color="#3366cc"
                v-if="book.e_book"
                class="rounded-xl ml-auto"
                :href="book.file"
                target="_blank"
              >
                Скачать
              </v-btn>
            </p>
            <p class="text-center text-gray-500">Заказать в библиотеке</p>
            <v-container>
              <v-row justify="center" align="center">
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
                                <v-icon @click="datetime = false"
                                  >mdi-close</v-icon
                                >
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
                                    val =>
                                      ![0, 7].includes(new Date(val).getDay())
                                  "
                                  :min="minDate"
                                  :max="getEndDate"
                                ></v-date-picker>
                              </v-tab-item>
                              <v-tab-item key="time">
                                <v-time-picker
                                  width="250"
                                  v-model="time"
                                  format="24hr"
                                  :min="minTime"
                                  :allowed-hours="allowedHours"
                                  :allowed-minutes="allowedMinutes"
                                ></v-time-picker>
                                <v-btn @click="prev" class="d-block"
                                  >Назад</v-btn
                                >
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
                    :disabled="book.quantity === 0 || !time || !date"
                    color="blue darken-1"
                    @click.prevent="orderBook"
                    :loading="isLoading"
                    dark
                  >
                    Заказать
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import { mapGetters } from 'vuex'
export default {
  name: 'BookModal',
  data() {
    return {
      modal: false,
      activeTab: 0,
      date: '',
      time: '',
      datetime: false,
      isLoading: false,
      allowedHours: [9, 10, 11, 12, 13, 14, 15, 16, 17],
      allowedMinutes: [0, 15, 30, 45],
      dateNow: new Date(),
      minDate: new Date().toISOString().slice(0, 10)
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: () => null
    }
  },
  computed: {
    ...mapGetters({ book: 'book/book' }),
    orderTime() {
      return this.date + ' ' + this.time
    },
    minTime() {
      const date = new Date()
      if (this.date > this.minDate) return
      return date.getHours() + ':' + date.getMinutes()
    },
    getEndDate() {
      let endDate = new Date(
        this.dateNow.getFullYear(),
        this.dateNow.getMonth() + 1,
        20
      )
      return endDate.toISOString().slice(0, 10)
    }
  },
  methods: {
    closeDialog() {
      this.isLoading = false
      this.modal = false
      this.activeTab = 0
      this.date = ''
      this.time = ''
      this.$store.commit('book/CLEAR_BOOK')
    },
    fetchBook(id) {
      NProgress.start()
      this.$store.dispatch('book/fetchBook', id).then(() => NProgress.done())
    },
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
          book: this.id
        })
        .then(() => {
          this.closeDialog()
        })
    }
  }
}
</script>
