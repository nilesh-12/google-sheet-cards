import { useQuery } from "@tanstack/react-query"

const db = {
  // leads 
  leads: [{ refId: 1, stage: 'inquiry' }],

  // inquiry data
  inquiry: [{ name: '', dob: '', leadRefId: 1, contact: '' }],

  // lead data 
  lead: [{ amount: '', roi: '', leadRefId: 1, creditScore: '' }],

  // analysis data 
  analysis: [{ bank: '', eligible: '', leadRefId: 1 }],

  findByRefId(refId: number) {
    return this.leads.find(l => l.refId === refId);
  },

  findByStageAndRefId({ stage, refId }) {
    return this[stage].find(l => l.leadRefId === refId)
  },

  validateByRefId(refId: number) {

    const l = this.findByRefId(refId)

    const dataByStage = this.findByStageAndRefId(l)

    const result: string[] = [];

    const isEmpty = v => v === '' || v == null

    // dataByStage should not have any empty value
    for (const [key, value] of Object.entries(dataByStage)) {
      if (isEmpty(value)) {
        result.push(key)
      }
    }

    const hasEmptyKeys = result.length > 0

    if (hasEmptyKeys) {
      throw { valid: false, missing: result }
    } else {
      return { valid: true, }
    }
  }
}

// inquiry to lead 
db.inquiry = [{ name: 'Nilesh Suthar', dob: '2002-10-28', leadRefId: 1, contact: 'sutharnilesh1901@gmail.com' }]
db.leads[0].stage = 'lead'

// lead to analysis 
db.lead[0].roi = '3%'
db.lead[0].amount = '12_00_000'
db.lead[0].creditScore = '780'
db.leads[0].stage = 'analysis'

// analysis data 
// db.analysis[0].bank = 'Kotak'
// db.analysis[0].eligible = 'No'



const validateLeadStage = ({ refId }) => {
  // returns the keys for now
  return async () => db.validateByRefId(refId)
}

export const useValidateStageQuery = ({ refId }) => {
  return useQuery({
    queryKey: ['validate-lead-stage', refId],
    queryFn: validateLeadStage({ refId })
  })
}
