import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import SortDropdown from "../components/SortDropdown";
import SalesTable from "../components/SalesTable";
import Pagination from "../components/Pagination";
import { useSalesData } from "../hooks/useSalesData";

function Dashboard() {
  const {
    data,
    loading,
    error,
    page,
    totalPages,
    search,
    sortBy,
    order,
    updateSearch,
    updateFilters,
    updateSorting,
    nextPage,
    prevPage
  } = useSalesData();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Sales Management System</h1>
        <SearchBar value={search} onChange={updateSearch} />
      </header>

      <section className="dashboard-filters">
        <FilterPanel onFilterChange={updateFilters} />
        <SortDropdown
          sortBy={sortBy}
          order={order}
          onSortChange={updateSorting}
        />
      </section>

      <section className="dashboard-table">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <SalesTable data={data} />}
      </section>

      <footer className="dashboard-pagination">
        <Pagination
          page={page}
          totalPages={totalPages}
          onNext={nextPage}
          onPrev={prevPage}
        />
      </footer>
    </div>
  );
}

export default Dashboard;
