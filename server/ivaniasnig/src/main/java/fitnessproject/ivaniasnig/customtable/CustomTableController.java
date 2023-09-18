package fitnessproject.ivaniasnig.customtable;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/customtables")
public class CustomTableController {
    
    @Autowired
    private CustomTableService customTableService;

    @GetMapping
    public List<CustomTable> getAllCustomTables() {
        return customTableService.getAllCustomTables();
    }


    @PostMapping
    public CustomTable createCustomTable(@RequestBody CustomTable customTable, @RequestParam UUID userId) {
        return customTableService.saveCustomTable(customTable, userId);
    }

//    @PutMapping("/{id}")
//    public CustomTable updateCustomTable(@PathVariable UUID id, @RequestBody CustomTable customTable) {
//        if(!customTableService.getCustomTableById(id).isPresent()) {
//            throw new RuntimeException("CustomTable not found for id: " + id);
//        }
//        return customTableService.saveCustomTable(customTable);
//    }

    @DeleteMapping("/{id}")
    public String deleteCustomTable(@PathVariable UUID id) {
        customTableService.deleteCustomTable(id);
        return "Deleted CustomTable with id: " + id;
    }
}
