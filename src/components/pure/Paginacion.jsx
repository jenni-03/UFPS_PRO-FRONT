import React from 'react';
import { Flex, Button, Icon } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Boton from '../pure/Boton';

export default function Paginacion({
  currentPage,
  totalPages,
  indexI,
  indexF,
  handlePageChange,
  atrasPage,
  adelantePage,
}) {
  return (
    <Flex className="pagination" justifyContent="center">
      <Button
        isDisabled={currentPage === 0}
        onClick={atrasPage}
        w="30px"
        borderRadius="50%"
      >
        <Icon as={MdChevronLeft} color={"primero.100"} boxSize={5} />
      </Button>
      {Array.from({ length: totalPages })
        .slice(indexI, indexF)
        .map((_, index) => {
          index = index + indexI;
          return (
            <Button
              key={index}
              onClick={() => {
                handlePageChange(index);
              }}
              bgColor={currentPage === index ? 'primero.100' : 'segundo.100'}
              textColor={currentPage === index ? 'white' : 'primero.100'}
              _hover={{
                bgColor: currentPage === index ? 'primero.100' : 'gray.300',
              }}
              w="30px"
              alignItems="center"
            >
              {index + 1}
            </Button>
          );
        })}
      <Button
        isDisabled={currentPage === totalPages - 1}
        onClick={adelantePage}
        w="30px"
        borderRadius="50%"
      >
        <Icon as={MdChevronRight} color={"primero.100"} boxSize={5} />
      </Button>
    </Flex>
  );
}

