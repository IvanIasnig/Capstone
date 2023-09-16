package fitnessproject.ivaniasnig.customtable;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomEntryRepository extends JpaRepository<CustomEntry, UUID> {

}
