package com.devsuperior.dspesquisa.repositories;


import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dspesquisa.entities.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

	// Repository nao conhece DTo
	// query consulta com a linguagem JPA obj= apelido objeto, Record=nome da class
	@Query("SELECT obj FROM Record obj WHERE "
			+ "(coalesce(:min, null) IS NULL OR obj.moment >= :min) AND "
			+ "(coalesce(:max, null) IS NULL OR obj.moment <= :max)")
	Page<Record> findByMoment(Instant min, Instant max, Pageable pageable);

}
