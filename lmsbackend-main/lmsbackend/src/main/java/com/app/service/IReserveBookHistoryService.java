package com.app.service;

import java.util.List;

import com.app.pojos.ReserveBookHistory;
import com.app.pojos.User;

public interface IReserveBookHistoryService {
ReserveBookHistory addReserBookHistory(ReserveBookHistory reserveBookHistory);
List<ReserveBookHistory> getReservationHistoryByUser(User user);
List<ReserveBookHistory> getReservationHistoryByLibraryId(int id);
}
