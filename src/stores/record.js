import { ref, computed, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useRecordStore = defineStore('record', () => {
  // RECORD
  const record = ref([])
  const type = ref('')
  const amount = ref()
  const date = ref('')
  const category = ref('')
  const note = ref()
  function addRecord() {
    if (amount.value === '' || amount.value === undefined) {
      alert('请输入金额')
      return
    } else {
      record.value.push({
        id: Date.now(),
        type: type.value,
        amount: amount.value,
        category: category.value,
        note: note.value,
        date: date.value,
      })
      amount.value = ''
      note.value = ''
    }
  }

  function remove(id) {
    record.value = record.value.filter((r) => {
      return r.id != id.id
    })
  }

  // MONTHLY
  const options = ref([])
  const selected = ref()
  const thisMonthExpense = ref(0)
  const thisMonthIncome = ref(0)
  const thisMonth = ref(0)

  //BUDGET
  const budget = ref(0)
  const editing = ref(false)
  const text = ref()
  const progressPercentage = ref(0)
  const percentage = ref(0)
  const status = ref()
  function startEdit() {
    editing.value = true
    text.value = budget.value
  }
  function cancelEdit() {
    editing.value = false
  }
  function finishEdit() {
    budget.value = text.value
    editing.value = false
  }

  // INIT
  function init() {
    watch(
      amount,
      () => {
        if (amount.value !== '' && amount.value <= 0) {
          alert('金额必须大于0，请重新输入')
          amount.value = ''
        }
      },
      { deep: true },
    )
    watch(
      type,
      () => {
        if (type.value === 'expense') {
          category.value = '餐饮'
        }
        if (type.value === 'income') {
          category.value = '工资'
        }
      },
      { deep: true },
    )
    watch(
      [record, selected, budget],
      () => {
        // RECORD
        record.value.sort((a, b) => a.date.localeCompare(b.date))
        localStorage.setItem('record', JSON.stringify(record.value))
        // MONTHLY
        options.value = []
        record.value.forEach((item) => {
          options.value.push({ option: item.date.slice(0, 7) })
          const i = ref(1)
          // 过滤重复options
          while (i.value < options.value.length) {
            if (options.value[i.value].option === options.value[i.value - 1].option) {
              options.value.splice(i.value, 2, { option: item.date.slice(0, 7) })
              i.value++
            } else {
              i.value++
            }
          }
        })
        localStorage.setItem('selectedMonth', selected.value)
        thisMonth.value = 0
        thisMonthExpense.value = 0
        thisMonthIncome.value = 0
        record.value.forEach((item) => {
          // calculate
          if (item.date.slice(0, 7) === selected.value) {
            if (item.type === 'expense') {
              thisMonthExpense.value += item.amount
            }
            if (item.type === 'income') {
              thisMonthIncome.value += item.amount
            }
          }
        })
        thisMonth.value = thisMonthIncome.value - thisMonthExpense.value

        progressPercentage.value = computed(() => {
          if (budget.value <= 0) {
            progressPercentage.value = '0.00%'
          } else {
            percentage.value = (thisMonthExpense.value / budget.value) * 100
            if (percentage.value > 100) {
              status.value = 'exception'
              progressPercentage.value = percentage.value.toFixed(2) + '%' + ' 已超支标记!!!'
            } else {
              status.value = undefined
              progressPercentage.value = percentage.value.toFixed(2) + '%'
            }
          }
        })
        localStorage.setItem('jizhang.budget.v1', budget.value)
      },
      {
        deep: true,
      },
    )

    watch(
      options,
      () => {
        if (!options.value[0]) selected.value = 'nothing'
        else selected.value = options.value[options.value.length - 1].option
      },
      { deep: true },
    )

    onMounted(() => {
      const savedRecord = localStorage.getItem('record')
      if (savedRecord) {
        record.value = JSON.parse(savedRecord)
      }

      const savedBudget = ref(localStorage.getItem('jizhang.budget.v1'))
      if (savedBudget) budget.value = Number(savedBudget.value)
      else budget.value = 3000

      const savedSelectedMonth = ref(localStorage.getItem('selectedMonth'))
      if (savedSelectedMonth) selected.value = savedSelectedMonth.value
    })
  }

  return {
    addRecord,
    init,
    remove,
    record,
    amount,
    type,
    date,
    category,
    note,
    options,
    selected,
    thisMonthExpense,
    thisMonthIncome,
    thisMonth,
    budget,
    progressPercentage,
    percentage,
    status,
    editing,
    text,
    startEdit,
    cancelEdit,
    finishEdit,
  }
})
