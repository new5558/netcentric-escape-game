import { observable, action } from 'mobx';

class StartStore {
	@observable
	coolVariable = 420;

	@action.bound
	hello() {
		this.coolVariable += 1;
	}

	@action.bound
	reset() {
		this.coolVariable = 420;
	}

	@action.bound
	set(value) {
		this.coolVariable = value;
	}
}

export default new StartStore();