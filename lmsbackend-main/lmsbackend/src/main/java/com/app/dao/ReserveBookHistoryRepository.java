package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.ReserveBookHistory;
import com.app.pojos.User;

public interface ReserveBookHistoryRepository extends JpaRepository<ReserveBookHistory, Integer> {
Optional<List<ReserveBookHistory>> findByUser(User user);
@Query(value="select * from reserve_book_history_tbl where library=?1",nativeQuery = true)
Optional<List<ReserveBookHistory>> findByLibraryId(int id);
}
