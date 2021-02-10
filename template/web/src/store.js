export const store = {
  state: {
    searchResults: [],
    searchTerm: ''
  },
  updateResults(searchResults) {
    this.state.searchResults.splice(0)
    this.state.searchResults.push(searchResults)
  },
  clearSearch() {
    this.state.searchTerm.splice(0)
  }
}