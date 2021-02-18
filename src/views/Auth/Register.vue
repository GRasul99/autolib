<template>
  <div class="px-3">
    <v-card
      width="400"
      class="mx-auto mt-10 px-2 border-shadow rounded-xl mb-15"
    >
      <p class="text-center text-h6 pt-3 text-uppercase">
        Регистрация на сайте
      </p>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <!--  FIRST STEP   -->
          <div v-if="currentStep === 1">
            <v-text-field
              type="text"
              v-model="username"
              label="Логин"
              prepend-icon="mdi-account-circle"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              label="Пароль"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :rules="[rules.required]"
            />
            <v-text-field
              type="email"
              v-model="email"
              label="Почта"
              prepend-icon="mdi-email"
              :rules="[rules.required, rules.email]"
            />
            <v-select
              class="rounded-lg"
              placeholder="Выберите роль"
              :items="roles"
              dense
              outlined
              v-model="role"
              :rules="[rules.required]"
            />
          </div>

          <!--  SECOND STEP FOR STUDENT   -->
          <div v-if="currentStep === 2 && role === roles[0]">
            <v-text-field
              type="text"
              v-model="full_name"
              placeholder="Ф. И. О"
              append-icon="mdi-account"
              :rules="[rules.required]"
            />
            <v-autocomplete
              :items="university.universities"
              placeholder="Выберите университет"
              item-value="id"
              item-text="name"
              no-data-text="Нет подходящих университетов"
              v-model="universityId"
              :rules="[rules.required]"
            />
            <v-autocomplete
              :items="universityFaculties[0]"
              item-value="id"
              item-text="name"
              placeholder="Выберите факультет "
              no-data-text="Нет подходящих факультетов"
              v-model="facultyId"
              :rules="[rules.required]"
            />
            <v-text-field
              type="text"
              v-model="group_name"
              placeholder="Группа"
              append-icon="mdi-accounts"
              :rules="[rules.required]"
            />
            <v-text-field-simplemask
              :rules="[rules.required, rules.phone]"
              v-model="tel_num"
              v-bind:properties="{
                prefix: '+998',
                suffix: '',
                clearable: true,
                placeholder: '(99)-999-99-99'
              }"
              v-bind:options="{
                inputMask: '(##) ###-##-##',
                outputMask: '#########'
              }"
            />
            <v-text-field
              type="text"
              v-model="passport_serial_id"
              placeholder="Пасспорт"
              append-icon="mdi-mail"
              counter="9"
              :rules="[rules.required]"
              v-mask="passportMask"
            />
          </div>

          <!--  SECOND STEP FOR TEACHERS   -->
          <div v-if="currentStep === 2 && role === roles[1]">
            <v-text-field
              type="text"
              v-model="full_name"
              placeholder="Ф. И. О"
              append-icon="mdi-account"
              :rules="[rules.required]"
            />
            <v-autocomplete
              :items="university.universities"
              placeholder="Выберите университет "
              item-value="id"
              item-text="name"
              no-data-text="Нет подходящих университетов"
              v-model="universityId"
              :rules="[rules.required]"
            />
            <v-text-field
              type="text"
              v-model="kafedra"
              placeholder="Кафедра"
              append-icon="mdi-account"
              :rules="[rules.required]"
            />
            <v-text-field
              type="text"
              v-model="position"
              placeholder="Должность"
              append-icon="mdi-account"
              :rules="[rules.required]"
            />
            <v-text-field-simplemask
              :rules="[rules.required, rules.phone]"
              v-model="tel_num"
              v-bind:properties="{
                prefix: '+998',
                suffix: '',
                clearable: true,
                placeholder: '(99)-999-99-99'
              }"
              v-bind:options="{
                inputMask: '(##) ###-##-##',
                outputMask: '#########'
              }"
            />
            <v-text-field
              type="text"
              v-model="passport_serial_id"
              placeholder="Пасспорт"
              append-icon="mdi-mail"
              :rules="[rules.required]"
              v-mask="passportMask"
            />
          </div>

          <!--  SECOND STEP FOR LIBRARIAN   -->
          <div v-if="currentStep === 2 && role === roles[2]">
            <v-text-field
              type="text"
              v-model="full_name"
              placeholder="Ф. И. О"
              append-icon="mdi-account"
              :rules="[rules.required]"
            />
            <v-autocomplete
              :items="university.universities"
              placeholder="Выберите университет "
              item-value="id"
              item-text="name"
              no-data-text="Нет подходящих университетов"
              v-model="universityId"
              :rules="[rules.required]"
            />
            {{ university.universities }}
            <v-text-field
              type="text"
              v-model="position"
              placeholder="Должность"
              append-icon="mdi-account"
              :rules="[rules.required]"
            />
            <v-text-field-simplemask
              :rules="[rules.required, rules.phone]"
              v-model="tel_num"
              v-bind:properties="{
                prefix: '+998',
                suffix: '',
                clearable: true,
                placeholder: '(99)-999-99-99'
              }"
              v-bind:options="{
                inputMask: '(##) ###-##-##',
                outputMask: '#########'
              }"
            />
            <v-text-field
              type="text"
              v-model="passport_serial_id"
              v-mask="passportMask"
              placeholder="Пасспорт"
              append-icon="mdi-mail"
              :rules="[rules.required]"
            />
          </div>
          <v-card-actions>
            <v-spacer />
            <v-btn
              to="/register"
              color="#3366cc"
              class="px-12"
              dark
              @click.prevent="next"
              v-if="currentStep === 1"
              >Далее</v-btn
            >
            <v-btn
              to="/register"
              color="#3366cc"
              text
              @click.prevent="prev"
              v-if="currentStep === 2"
              >Назад</v-btn
            >
            <v-spacer />
            <v-btn
              @click.prevent="registerStudent"
              v-if="currentStep === 2 && role === roles[0]"
              color="#3366cc"
              class="px-12"
              dark
              >Регистрация</v-btn
            >
            <v-btn
              @click.prevent="registerTeacher"
              v-if="currentStep === 2 && role === roles[1]"
              color="#3366cc"
              class="px-12"
              dark
              >Регистрация</v-btn
            >
            <v-btn
              @click.prevent="registerLibrarian"
              v-if="currentStep === 2 && role === roles[2]"
              color="#3366cc"
              class="px-12"
              dark
              >Регистрация</v-btn
            >
            <v-spacer v-if="currentStep === 2" />
          </v-card-actions>
        </v-form>
        <v-alert
          v-for="error in errors[0]"
          :key="error.id"
          border="right"
          type="error"
          colored-border
          elevation="2"
          light
        >
          {{ error[0] }}
        </v-alert>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-row>
          <v-col cols="12" class="d-flex justify-center flex-column">
            <p class="text-center mb-2">
              Есть аккаунт?
            </p>
            <p class="text-center mb-0">
              <v-btn to="/login" color="#3366cc" class="px-20" dark outlined
                >Войти</v-btn
              >
            </p>
          </v-col>
        </v-row>
      </v-card-actions>
      <v-snackbar v-model="snackbar" timeout="6000">
        Пожалуйста перейдите на почту чтобы подтвердить ваш E-mail
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import rules from '@/helpers/rules.js'
export default {
  name: 'Register',
  data: () => ({
    errors: [],
    counts: [1, 2, 3],
    snackbar: false,
    valid: false,
    currentStep: 1,
    totalSteps: 2,
    email: '',
    username: '',
    password: '',
    showPassword: false,
    role: null,
    roles: ['Студент', 'Преподователь', 'Библиотекарь'],
    universityId: null,
    facultyId: '',
    full_name: '',
    group_name: '',
    kafedra: '',
    position: '',
    passport_serial_id: '',
    passportMask: 'AA-#######',
    tel_num: null,
    tel_num_mask: '##-###-##-##',
    dropDownOptions: { disabledDialCode: false },
    onlyCountries: ['UZ'],
    rules
  }),
  methods: {
    next() {
      this.currentStep++
    },
    prev() {
      this.currentStep--
    },
    registerStudent() {
      this.$store
        .dispatch('auth/register', {
          email: this.email,
          username: this.username,
          password: this.password,
          role: 'S',
          full_name: this.full_name,
          university_id: this.universityId,
          faculty: this.facultyId,
          group_name: this.group_name,
          passport_serial_id: this.passport_serial_id,
          tel_num: this.tel_num,
          kafedra: null,
          position: null
        })
        .then(() => {
          this.errors = []
          this.snackbar = true
        })
        .catch(error => {
          this.errors.push(error.response.data)
        })
    },
    registerTeacher() {
      this.$store
        .dispatch('auth/register', {
          email: this.email,
          username: this.username,
          password: this.password,
          role: 'T',
          full_name: this.full_name,
          university_id: this.universityId,
          faculty: null,
          group_name: null,
          passport_serial_id: this.passport_serial_id,
          tel_num: this.tel_num,
          kafedra: this.kafedra,
          position: this.position
        })
        .then(() => {
          this.errors = []
          this.snackbar = true
        })
        .catch(error => {
          this.errors.push(error.response.data)
        })
    },
    registerLibrarian() {
      this.$store
        .dispatch('auth/register', {
          email: this.email,
          username: this.username,
          password: this.password,
          role: 'L',
          full_name: this.full_name,
          university_id: this.universityId,
          faculty: null,
          group_name: null,
          passport_serial_id: this.passport_serial_id,
          tel_num: this.tel_num,
          kafedra: null,
          position: this.position
        })
        .then(() => {
          this.errors = []
          this.snackbar = true
        })
        .catch(error => {
          this.errors.push(error.response.data)
        })
    }
  },
  computed: {
    ...mapState(['university', 'faculty']),
    findUniversity() {
      return this.university.universities.filter(university => {
        return university.id === this.universityId
      })
    },
    universityFaculties() {
      return this.findUniversity.map(array => {
        return this.faculty.faculties.filter(faculty => {
          return array.faculties.includes(faculty.id)
        })
      })
    }
  },
  created() {
    this.$store.dispatch('university/fetchUniversities')
    this.$store.dispatch('faculty/fetchFaculties')
  }
}
</script>

<style scoped>
.v-card__title {
  word-break: normal;
}
</style>
