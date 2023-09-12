package fitnessproject.ivaniasnig.diet;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;


public interface DietRepository extends JpaRepository<Diet, UUID> {

}
