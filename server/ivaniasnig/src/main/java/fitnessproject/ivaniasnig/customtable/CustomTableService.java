package fitnessproject.ivaniasnig.customtable;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fitnessproject.ivaniasnig.user.User;
import fitnessproject.ivaniasnig.user.UserRepository;

import java.util.Optional;

@Service
public class CustomTableService {
    
    @Autowired
    private CustomTableRepository customTableRepository;
    
	@Autowired
	private UserRepository userRepo;

    public List<CustomTable> getAllCustomTables() {
        return customTableRepository.findAll();
    }

    public Optional<CustomTable> getCustomTableById(UUID id) {
        return customTableRepository.findById(id);
    }


    @Transactional
    public CustomTable saveCustomTable(CustomTable customTable, UUID userId) {
    	
    	 User user = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
    	
        if(customTable.getEntries() != null) {
            customTable.getEntries().forEach(entry -> entry.setTable(customTable));
        }
        
        customTable.setUser(user);
        
        user.getCustomTables().add(customTable);

        return customTableRepository.save(customTable);
    }
    
    @Transactional
    public CustomTable addEntry(UUID id, CustomEntry newEntry) {
        CustomTable existingTable = customTableRepository.findById(id)
          .orElseThrow(() -> new IllegalArgumentException("Table not found"));

        newEntry.setTable(existingTable); 

        existingTable.getEntries().add(newEntry); 

        return customTableRepository.save(existingTable);
    }

    
   
    public void deleteCustomTable(UUID id) {
        customTableRepository.deleteById(id);
    }
    
}

