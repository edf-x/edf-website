import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import moment from 'moment'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        return this.metaReducer.init(state, getInitState(option))
    }

    load = (state, { person, departments }) => {
        if (person) {
            state = this.metaReducer.sf(state, 'data.form', fromJS(person))
        }
        return this.metaReducer.sf(state, 'data.other.departments', fromJS(departments))
    }

    loadRoles = (state, { roleLists, roles }) => {
        state = this.metaReducer.sf(state, 'data.other.roles', fromJS(roles))
        return this.metaReducer.sf(state, 'data.roles', fromJS(roleLists))
    }


    setPerson = (state, person) => {
        state = this.metaReducer.sf(state, 'data.form', fromJS(person))

        return this.metaReducer.sf(state, 'data.other.checkFields', List())
    }

    addDepartment = (state, { id, code, name }) => {
        return this.metaReducer.sf(state, 'data.form.department', code)
    }

    selectRoles = (state, roleIds) => {
        return this.metaReducer.sf(state, 'data.other.selectedRoles', fromJS(roleIds))
    }

}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}