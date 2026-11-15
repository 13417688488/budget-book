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
  function removeAll() {
    if (record.value.length === 0) {
      alert('这里啥都木有......你在干神魔')
      return
    }
    if (!window.confirm('确定要清空全部记录吗?此操作不可恢复！')) return
    record.value = []
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
  const progressPercentage = computed(() => {
    if (budget.value <= 0) {
      return '0.00%'
    } else {
      percentage.value = Number((thisMonthExpense.value / budget.value) * 100)
      if (percentage.value > 100) {
        status.value = 'exception'
        return percentage.value.toFixed(2) + '%' + ' 已超支标记!!!'
      } else {
        status.value = undefined
        return percentage.value.toFixed(2) + '%'
      }
    }
  })
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
    options.value.forEach((o) => {
      if (o.option === selected.value) {
        o.budget = text.value
        budget.value = o.budget
      }
    })

    editing.value = false
  }

  //TEST
  const testlist = ref([])

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
      budget,
      () => {
        testlist.value = options.value
      },
      { deep: true },
    )
    watch(
      [record, selected],
      () => {
        // RECORD
        record.value.sort((a, b) => b.date.localeCompare(a.date))
        localStorage.setItem('jizhang.records.v1', JSON.stringify(record.value))
        // MONTHLY
        const list = ref(options.value)
        testlist.value = options.value
        options.value = []

        if (list.value.length === 0) {
          record.value.forEach((item) => {
            options.value.push({ option: item.date.slice(0, 7), budget: 3000 })
            const i = ref(1)
            // 过滤重复options
            while (i.value < options.value.length) {
              if (options.value[i.value].option === options.value[i.value - 1].option) {
                const budget = options.value[i.value - 1].budget
                options.value.splice(i.value - 1, 2, {
                  option: item.date.slice(0, 7),
                  budget: budget,
                })
                i.value++
              } else {
                i.value++
              }
            }
          })
        } else {
          list.value.forEach((l) => {
            record.value.forEach((item) => {
              if (l.option === item.date.slice(0, 7)) {
                options.value.push({ option: l.option, budget: l.budget })
                const i = ref(1)
                while (i.value < options.value.length) {
                  options.value.sort((a, b) => a.option.localeCompare(b.option))
                  if (options.value[i.value].option === options.value[i.value - 1].option) {
                    const budget = options.value[i.value].budget
                    options.value.splice(i.value - 1, 2, {
                      option: item.date.slice(0, 7),
                      budget: budget,
                    })
                    i.value++
                  } else {
                    i.value++
                  }
                }
                // options.value.push({ option: l.option, budget: l.budget })
              } else {
                options.value.push({ option: item.date.slice(0, 7), budget: 3000 })
                const i = ref(1)
                while (i.value < options.value.length) {
                  options.value.sort((a, b) => a.option.localeCompare(b.option))
                  if (options.value[i.value].option === options.value[i.value - 1].option) {
                    const budget = options.value[i.value - 1].budget
                    options.value.splice(i.value - 1, 2, {
                      option: item.date.slice(0, 7),
                      budget: budget,
                    })
                    i.value++
                  } else {
                    i.value++
                  }
                }
              }
            })
          })
        }

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

        options.value.forEach((o) => {
          if (o.option === selected.value) {
            budget.value = o.budget
          }
        })

        localStorage.setItem('jizhang.budget.v1', JSON.stringify(options.value))
      },
      {
        deep: true,
      },
    )

    watch(
      options,
      () => {
        localStorage.setItem('jizhang.budget.v1', JSON.stringify(options.value))
        const months = options.value
        if (months.length === 0) selected.value = 'nothing'
        else if (!months.some((item) => item.option === selected.value))
          selected.value = months[months.length - 1].option
      },
      { deep: true },
    )

    onMounted(() => {
      const savedRecord = localStorage.getItem('jizhang.records.v1')
      if (savedRecord) {
        record.value = JSON.parse(savedRecord)
      }

      const savedBudget = localStorage.getItem('jizhang.budget.v1')
      if (savedBudget) {
        options.value = JSON.parse(savedBudget)
        testlist.value = JSON.parse(savedBudget)
        options.value.forEach((o) => {
          if (o.option === selected.value) {
            budget.value = o.budget
          }
        })
      } else budget.value = 3000

      const savedSelectedMonth = ref(localStorage.getItem('selectedMonth'))
      if (savedSelectedMonth) selected.value = savedSelectedMonth.value
    })
  }

  return {
    addRecord,
    init,
    remove,
    removeAll,
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
    testlist,
  }
})
