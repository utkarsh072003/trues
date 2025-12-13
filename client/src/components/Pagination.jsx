function Pagination({ page, totalPages, onNext, onPrev }) {
  return (
    <div>
      <button onClick={onPrev} disabled={page <= 1}>
        Previous
      </button>

      <span>
        Page {totalPages === 0 ? 0 : page} of {totalPages}
      </span>

      <button onClick={onNext} disabled={page >= totalPages || totalPages === 0}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
