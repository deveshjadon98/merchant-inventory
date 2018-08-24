import React from 'react'
import {shallow} from 'enzyme'
import DataTable from '../../src/components/DataTable/DataTable'

describe('[Components] - DataTable Component', () => {

	test('should render correctly with DataTable Component', () => {

		const node = shallow(<App/>)
  expect(node.find('.card').exists()).toEqual(true)
		expect(node.find('.datagrid').exists()).toEqual(true)
	})
})