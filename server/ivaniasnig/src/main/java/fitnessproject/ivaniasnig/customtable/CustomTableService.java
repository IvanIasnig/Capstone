package fitnessproject.ivaniasnig.customtable;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fitnessproject.ivaniasnig.exceptions.NotFoundException;
import fitnessproject.ivaniasnig.user.User;
import fitnessproject.ivaniasnig.user.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomTableService {
    
    @Autowired
    private CustomTableRepository customTableRepository;

    public List<CustomTable> getAllCustomTables() {
        return customTableRepository.findAll();
    }

    public Optional<CustomTable> getCustomTableById(UUID id) {
        return customTableRepository.findById(id);
    }

    public CustomTable saveCustomTable(CustomTable customTable) {
        return customTableRepository.save(customTable);
    }

    public void deleteCustomTable(UUID id) {
        customTableRepository.deleteById(id);
    }
}

