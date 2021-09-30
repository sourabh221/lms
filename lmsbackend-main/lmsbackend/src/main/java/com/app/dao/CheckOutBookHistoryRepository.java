package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.CheckOutBookHistory;

public interface CheckOutBookHistoryRepository extends JpaRepository<CheckOutBookHistory, Integer> {

}
